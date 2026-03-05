import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dog, Cat, Bird, Fish } from 'lucide-react';

const CategoryCard = ({ category, image }) => {
  const iconMap = {
    dog: Dog,
    cat: Cat,
    bird: Bird,
    fish: Fish,
  };

  const Icon = iconMap[category.name] || Dog;

  return (
    <Link to={`/products?category=${category.name}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="card cursor-pointer group"
      >
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={category.label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-fredoka text-2xl font-bold text-white">
                  {category.label}
                </h3>
                <p className="text-white/80 text-sm font-quicksand">
                  Shop {category.label}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-b-3xl">
          <div className="flex items-center justify-between">
            <span className="text-[#FF6B6B] font-quicksand font-semibold text-sm">
              View Products
            </span>
            <div className="w-8 h-8 bg-[#FFF7E6] rounded-full flex items-center justify-center group-hover:bg-[#FF6B6B] transition-colors">
              <svg 
                className="w-4 h-4 text-[#FF6B6B] group-hover:text-white transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
