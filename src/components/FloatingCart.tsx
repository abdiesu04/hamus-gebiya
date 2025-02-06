'use client';

import { useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { usePathname, useRouter } from 'next/navigation';

export default function FloatingCart() {
  const { cartCount, total } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Hide on cart and checkout pages
  const shouldShow = !['/cart', '/checkout'].includes(pathname);

  useEffect(() => {
    if (cartCount > 0 && shouldShow) {
      setIsVisible(true);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [cartCount, shouldShow]);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => router.push('/cart')}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white rounded-full shadow-lg p-4 flex items-center space-x-3 hover:bg-blue-700 transition-all transform ${
        isAnimating ? 'scale-110' : 'scale-100'
      }`}
    >
      <div className="relative">
        <FiShoppingBag className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
      <div className="pr-2">
        <div className="text-sm font-semibold">${total.toFixed(2)}</div>
        <div className="text-xs opacity-90">View Cart</div>
      </div>
    </button>
  );
} 