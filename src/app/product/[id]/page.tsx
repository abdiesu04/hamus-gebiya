'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiMinus, FiPlus } from 'react-icons/fi';
import { allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      // Create an array of images, using the main image if no additional images exist
      const productImages = foundProduct.images || [foundProduct.image];
      
      setProduct({
        ...foundProduct,
        images: productImages,
        sizes: foundProduct.sizes || ['Default'],
        colors: foundProduct.colors || ['#000000'],
        stock: foundProduct.stock || 10,
        reviews: foundProduct.reviews || 0
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize || product.sizes[0],
      color: selectedColor || product.colors[0],
      quantity: quantity
    };
    addToCart(cartItem);
  };

  // Ensure we have a valid images array
  const productImages = product.images || [product.image];
  const currentImage = productImages[selectedImage] || productImages[0];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-200">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden bg-white border-2 ${
                    selectedImage === index
                      ? 'border-amber-500'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <FiStar className="w-5 h-5 text-amber-400" />
                  <span className="ml-1 text-gray-600">{product.rating || 0}</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{product.reviews || 0} reviews</span>
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${(product.price || 0).toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">
                  {product.stock || 'Out of'} in stock
                </span>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm font-medium rounded-lg ${
                        selectedSize === size
                          ? 'bg-amber-400 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-amber-400'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <FiMinus />
                  </button>
                  <span className="text-gray-900 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-500 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 