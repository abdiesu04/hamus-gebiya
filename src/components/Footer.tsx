'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600">Your premier destination for luxury shopping in Ethiopia.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link href="/shop" className="text-gray-600 hover:text-amber-500 transition-colors">Shop</Link></li>
              <li><Link href="/cart" className="text-gray-600 hover:text-amber-500 transition-colors">Cart</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:abdiesayasbayisa@gmail.com" className="hover:text-amber-500 transition-colors">
                  abdiesayasbayisa@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+251910928305" className="hover:text-amber-500 transition-colors">
                  +251 910 928 305
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <a href="https://github.com/abdiesu04" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                  github.com/abdiesu04
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Newsletter</h3>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
              <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2024 ሃሙስ ገብያ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 