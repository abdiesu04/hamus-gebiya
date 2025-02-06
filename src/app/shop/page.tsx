'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiFilter, FiX, FiStar, FiShoppingCart } from 'react-icons/fi';
import { allProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured sorting (default)
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Luxury Collection</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden p-2 rounded-full bg-gray-100 text-gray-600"
          >
            {isFilterOpen ? <FiX /> : <FiFilter />}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Sidebar */}
          <motion.div
            className={`lg:w-64 space-y-6 ${
              isFilterOpen ? 'block' : 'hidden lg:block'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-amber-400 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-amber-400 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Price Range
              </h2>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-gray-600">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sort By</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white text-gray-600 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="relative h-64">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-400 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                            <span className="px-2 py-1 bg-amber-400 text-xs font-bold rounded-full text-gray-900">
                              {product.category}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900">
                              ${product.price.toLocaleString()}
                            </span>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <FiStar className="w-5 h-5 text-amber-400" />
                                <span className="ml-1 text-gray-600">
                                  {product.rating}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart(product);
                                }}
                                className="p-2 rounded-full bg-amber-400 text-gray-900 hover:bg-amber-500 transition-colors"
                              >
                                <FiShoppingCart className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 