// Mock Stripe integration
interface PaymentIntent {
  id: string;
  amount: number;
  status: 'succeeded' | 'processing' | 'failed';
  client_secret: string;
}

interface StripeCheckoutSession {
  id: string;
  url: string;
}

export const stripe = {
  createPaymentIntent: async (amount: number): Promise<PaymentIntent> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: `pi_${Date.now()}`,
      amount,
      status: 'succeeded',
      client_secret: `seti_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`
    };
  },

  createCheckoutSession: async (items: any[]): Promise<StripeCheckoutSession> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: `cs_${Date.now()}`,
      url: '/checkout/success?session_id=mock_session'
    };
  },

  validatePaymentIntent: async (paymentIntentId: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
}; 