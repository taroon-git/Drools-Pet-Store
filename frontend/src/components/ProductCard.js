import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I want to order ${product.name} (₹${product.price}) from Drools Pet Store`
    );
    const whatsappNumber = '919999999999'; // Replace with actual number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="card card-hover"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Featured
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs font-bold text-[#4ECDC4] uppercase tracking-wide">
          {product.category}
        </span>

        <h3 className="font-fredoka text-lg font-bold text-[#333333] mt-2 mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm font-quicksand mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#FF6B6B] font-fredoka">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-500 font-quicksand">
            Stock: {product.stock}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppOrder}
          disabled={!product.in_stock}
          className="w-full btn-whatsapp disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="w-5 h-5" />
          Order on WhatsApp
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
