'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  brand: string;
}

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  autoScroll?: boolean;
}

export default function ProductCarousel({ products, title, autoScroll = false }: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (autoScroll && carouselRef.current) {
      const interval = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current!;
        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current!.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoScroll]);

  return (
    <div className="relative py-8">
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="flex-none w-80 scroll-snap-align-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
          >
            <Link href={`/product/${product.id}`}>
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <div className="relative h-48 w-full group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400 text-xs font-bold text-white">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="px-2 py-1 bg-gray-100 text-xs font-bold rounded-full text-gray-600">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                      <FiStar className="w-4 h-4 text-amber-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-amber-400 mt-3 font-medium">
                    {product.brand}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 