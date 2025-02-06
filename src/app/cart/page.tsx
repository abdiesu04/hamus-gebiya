'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiMinus, FiPlus, FiTrash2, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  const shipping = 10;
  const tax = (cartTotal || 0) * 0.1;
  const total = (cartTotal || 0) + shipping + tax;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="text-center py-12">
            <FiShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-400 hover:bg-amber-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-center">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {item.brand}
                            </p>
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            ${(item.price || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-1 rounded text-gray-600 hover:text-gray-900"
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 rounded text-gray-600 hover:text-gray-900"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-600 hover:text-red-600"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${(cartTotal || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    ${shipping.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full mt-6 bg-amber-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-500 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 