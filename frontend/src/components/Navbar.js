import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dog, Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#FFE5B4]/50 shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center">
              <Dog className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <span className="font-fredoka text-2xl md:text-3xl font-bold text-[#FF6B6B]">
              Drools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-quicksand font-semibold text-base transition-colors hover:text-[#FF6B6B] ${
                  isActive(item.path) ? 'text-[#FF6B6B]' : 'text-[#333333]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="btn-secondary text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-[#FFF7E6] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-[#333333]" /> : <Menu className="w-6 h-6 text-[#333333]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#FFE5B4]/50"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-quicksand font-semibold py-3 px-4 rounded-2xl transition-colors ${
                    isActive(item.path) 
                      ? 'bg-[#FF6B6B] text-white' 
                      : 'text-[#333333] hover:bg-[#FFF7E6]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="btn-secondary text-center mt-2"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
