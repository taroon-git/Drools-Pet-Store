import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: 'All Products', path: '/products' },
      { name: 'Dog Food', path: '/products?category=dog' },
      { name: 'Cat Food', path: '/products?category=cat' },
      { name: 'Bird Food', path: '/products?category=bird' },
      { name: 'Fish Food', path: '/products?category=fish' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Reviews', path: '/reviews' },
      { name: 'Contact', path: '/contact' },
    ],
    Support: [
      { name: 'Help Center', path: '/contact' },
      { name: 'Shipping Info', path: '/contact' },
      { name: 'Returns', path: '/contact' },
      { name: 'Track Order', path: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-fredoka text-2xl font-bold">Drools</span>
            </motion.div>
            <p className="text-gray-300 font-quicksand">
              Your trusted partner for premium pet nutrition. We provide high-quality food and supplies for your beloved pets.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div key={category} className="space-y-4">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="font-fredoka text-lg font-semibold"
              >
                {category}
              </motion.h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary transition-colors font-quicksand"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium font-quicksand">Address</p>
                <p className="text-gray-300 text-sm font-quicksand">123 Pet Street, Animal City, AC 12345</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium font-quicksand">Phone</p>
                <p className="text-gray-300 text-sm font-quicksand">+1 (234) 567-8900</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium font-quicksand">Email</p>
                <p className="text-gray-300 text-sm font-quicksand">info@droolspetstore.com</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-sm font-quicksand"
            >
              © {currentYear} Drools Pet Store. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-2 text-gray-400 text-sm font-quicksand mt-4 md:mt-0"
            >
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
