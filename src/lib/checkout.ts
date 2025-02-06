import { stripe } from './stripe';

interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutOptions {
  items: CheckoutItem[];
  userId: string;
  email: string;
}

export const checkout = {
  processPayment: async ({ items, userId, email }: CheckoutOptions) => {
    try {
      // Calculate total amount
      const amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Create Stripe payment intent
      const paymentIntent = await stripe.createPaymentIntent(amount);

      // Create checkout session
      const session = await stripe.createCheckoutSession(items);

      // Store order in mock database
      const order = {
        id: `order_${Date.now()}`,
        userId,
        items,
        amount,
        paymentIntentId: paymentIntent.id,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Simulate storing order
      localStorage.setItem(`order_${order.id}`, JSON.stringify(order));

      return {
        sessionId: session.id,
        sessionUrl: session.url,
        clientSecret: paymentIntent.client_secret
      };
    } catch (error) {
      console.error('Checkout error:', error);
      throw new Error('Payment processing failed');
    }
  },

  validatePayment: async (sessionId: string) => {
    try {
      // Validate payment with Stripe
      const isValid = await stripe.validatePaymentIntent(sessionId);

      if (isValid) {
        // Update order status
        const order = localStorage.getItem(`order_${sessionId}`);
        if (order) {
          const updatedOrder = {
            ...JSON.parse(order),
            status: 'completed',
            completedAt: new Date().toISOString()
          };
          localStorage.setItem(`order_${sessionId}`, JSON.stringify(updatedOrder));
        }
      }

      return isValid;
    } catch (error) {
      console.error('Payment validation error:', error);
      throw new Error('Payment validation failed');
    }
  }
}; 