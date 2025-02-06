'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if accessed directly
    const hasOrderCompleted = sessionStorage.getItem('orderCompleted');
    if (!hasOrderCompleted) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 fade-in">
            <BsCheckCircleFill className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-gray-600 text-lg">
              Your order has been successfully placed. We'll send you an email with your order details
              and tracking information.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8 slide-in">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Order Confirmation</h3>
                  <p className="text-gray-600">
                    You'll receive an email confirmation with your order details.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Order Processing</h3>
                  <p className="text-gray-600">
                    We'll start processing your order and prepare it for shipping.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Shipping</h3>
                  <p className="text-gray-600">
                    Once shipped, we'll send you tracking information via email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/profile/orders"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
            >
              View Orders
            </Link>
          </div>

          <div className="mt-12 text-gray-600">
            <p>Need help? Contact our support team at</p>
            <a href="mailto:support@luxury.com" className="text-blue-600 hover:underline">
              support@luxury.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 