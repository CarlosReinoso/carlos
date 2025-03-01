"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BuyOriginalWorksCTA() {
  return (
    <div className="relative flex justify-center items-center my-8">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg cursor-pointer transition-all duration-300"
      >
        <Link href="/originals" className="flex items-center gap-2">
          <span className="text-lg">🖼️ Explore Original Artworks</span>
        </Link>
      </motion.div>
    </div>
  );
}
