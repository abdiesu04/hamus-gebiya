'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCarousel from '@/components/ProductCarousel';
import { FiArrowRight, FiStar, FiTrendingUp, FiPackage, FiShield, FiGlobe } from 'react-icons/fi';
import { allProducts } from '@/data/products';

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const backgroundImages = [
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-32 h-32 rounded-full border-4 border-amber-400/30" />
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-t-amber-400 border-r-amber-400 border-b-transparent border-l-transparent"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const featuredProducts = allProducts.slice(0, 6);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen"
      onMouseMove={handleMouseMove}
    >
      <section ref={targetRef} className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        {/* 3D Parallax Background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-black [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        </motion.div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [20, -20, 20],
              rotate: [360, 180, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-l from-blue-500/10 via-amber-500/10 to-emerald-500/10 rounded-full blur-3xl"
          />
        </div>

        {/* Main Background Images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {backgroundImages.map((img, index) => (
              currentImageIndex === index && (
                <motion.div
                  key={img}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      duration: 2,
                      ease: [0.4, 0.0, 0.2, 1]
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 1.1,
                    transition: {
                      duration: 2,
                      ease: [0.4, 0.0, 0.2, 1]
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
                  <Image
                    src={img}
                    alt="Luxury Shopping"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={100}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"
                    style={{
                      x: mousePosition.x * -0.5,
                      y: mousePosition.y * -0.5,
                    }}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            style={{ y, opacity, scale }}
          >
            {/* Animated Brand Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                type: "spring",
                bounce: 0.5
              }}
              className="mb-8"
            >
              <motion.div 
                className="relative inline-block"
                animate={{ 
                  rotateX: [0, 360],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
              >
                <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 filter drop-shadow-2xl">
                  ሃሙስ
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-amber-400/20 to-amber-600/20 blur-xl -z-10"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <span className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400 font-ethiopian filter drop-shadow-2xl">
                  ገብያ
                </span>
              </motion.div>
            </motion.div>

            {/* Animated Tagline */}
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Experience luxury redefined. Where Ethiopian heritage meets modern elegance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/shop">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full font-bold text-lg flex items-center gap-3 hover:from-amber-500 hover:to-amber-700 transition-all transform hover:-translate-y-1 relative overflow-hidden"
                >
                  <span className="relative z-10">Shop Now</span>
                  <motion.span
                    className="relative z-10 group-hover:translate-x-2 transition-transform"
                  >
                    <FiArrowRight className="text-xl" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      x: mousePosition.x * 0.5,
                      y: mousePosition.y * 0.5,
                    }}
                  />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      x: mousePosition.x * 0.5,
                      y: mousePosition.y * 0.5,
                    }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="w-6 h-10 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div 
                  className="w-1 h-2 bg-white/50 rounded-full"
                  animate={{
                    y: [0, 4, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-6xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-gray-600 text-lg">Luxury Brands</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl md:text-6xl font-bold text-amber-400 mb-2">50k+</div>
              <div className="text-gray-600 text-lg">Clients</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl md:text-6xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-gray-600 text-lg">Authentic Products</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-4xl md:text-6xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-gray-600 text-lg">Concierge Service</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-xl text-gray-600">Curated for the Extraordinary</p>
          </motion.div>
          
          <ProductCarousel products={featuredProducts} autoScroll />
        </div>
      </section>

      {/* Luxury Experience Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-white via-amber-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 8s linear infinite',
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400 mb-4">
              Exclusive Privileges
            </h2>
            <p className="text-xl text-gray-600">Experience luxury beyond imagination</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="group p-8 rounded-2xl bg-white border border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="relative mb-8 inline-block"
              >
                <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700" />
                <FiShield className="w-20 h-20 text-amber-400 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Presidential Service</h3>
              <p className="text-gray-600 text-lg relative z-10">Dedicated personal concierge and priority access to exclusive releases.</p>
            </motion.div>

            <motion.div
              className="group p-8 rounded-2xl bg-white border border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="relative mb-8 inline-block"
              >
                <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700" />
                <FiGlobe className="w-20 h-20 text-amber-400 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Global Access</h3>
              <p className="text-gray-600 text-lg relative z-10">Worldwide shipping with private jet delivery options available.</p>
            </motion.div>

            <motion.div
              className="group p-8 rounded-2xl bg-white border border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="relative mb-8 inline-block"
              >
                <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700" />
                <FiStar className="w-20 h-20 text-amber-400 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">Elite Benefits</h3>
              <p className="text-gray-600 text-lg relative z-10">Exclusive events, private showings, and VIP privileges worldwide.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80"
            alt="Luxury Background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-amber-950/90" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30" />
        
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 mb-6">
              Join the Elite
            </h2>
            <p className="text-2xl text-amber-100/80">
              Subscribe for exclusive previews and VIP offers
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-8 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-amber-400/30 text-white text-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder-amber-200/50"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-transparent blur-xl -z-10" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(251,191,36,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full font-bold text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-500/30 whitespace-nowrap"
            >
              Join Now
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center gap-8 text-amber-200/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <FiShield className="w-5 h-5" />
              <span>Premium Access</span>
            </div>
            <div className="flex items-center gap-2">
              <FiStar className="w-5 h-5" />
              <span>VIP Events</span>
            </div>
            <div className="flex items-center gap-2">
              <FiGlobe className="w-5 h-5" />
              <span>Global Benefits</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
}
