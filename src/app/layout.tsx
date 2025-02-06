import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import FloatingCart from "@/components/FloatingCart";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury E-Commerce | Premium Shopping Experience",
  description: "Discover a world of premium products, from high-end electronics to luxury fashion and accessories. Your destination for an exceptional shopping experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${inter.className} bg-white`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16 bg-white">
            {children}
          </main>
          <Footer />
          <FloatingCart />
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
