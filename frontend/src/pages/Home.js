import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Phone, Clock, CheckCircle, Heart, Award, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category images from design guidelines
  const categoryImages = {
    dog: 'https://images.unsplash.com/photo-1582456891925-a53965520520?crop=entropy&cs=srgb&fm=jpg&q=85',
    cat: 'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?crop=entropy&cs=srgb&fm=jpg&q=85',
    bird: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea218?auto=format&fit=crop&q=80',
    fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80'
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [productsRes, categoriesRes, reviewsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/reviews')
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const reviewsData = await reviewsRes.json();

      setProducts(productsData.filter(p => p.featured).slice(0, 4));
      setCategories(categoriesData);
      setReviews(reviewsData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-[#FFB703] text-[#FFB703]' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFF7E6]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7E6]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
            >
              <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] mb-4 leading-tight">
                Happy Pets,
                <br />
                <span className="text-[#FF6B6B]">Happy You</span>
              </h1>
              <p className="font-quicksand text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                Best pet food and accessories in Dadri. Quality products for your beloved companions at affordable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-hover">
                <img
                  src="https://images.unsplash.com/photo-1587402092301-725e37c70fd8?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Happy pets with Drools products"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#4ECDC4] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-fredoka font-bold text-[#333333]">5000+</p>
                    <p className="text-sm text-gray-500 font-quicksand">Happy Customers</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4">
              Shop by Pet
            </h2>
            <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
              Find everything for your furry, feathered, or finned friends
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard 
                  category={category} 
                  image={categoryImages[category.name]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4">
              Featured Products
            </h2>
            <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular and recommended products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4">
              Why Choose Drools?
            </h2>
            <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best for your pets
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Quality Products', desc: 'Only trusted brands' },
              { icon: Heart, title: 'Made with Love', desc: 'Pet-first approach' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick to your door' },
              { icon: CheckCircle, title: 'Best Prices', desc: 'Affordable rates' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#FFF7E6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#FF6B6B]" />
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-gray-600 font-quicksand text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4">
              What Our Customers Say
            </h2>
            <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
              Real reviews from happy pet parents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 font-quicksand mb-4 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold font-fredoka">
                    {review.customer_name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium font-quicksand text-[#333333]">{review.customer_name}</p>
                    <p className="text-sm text-gray-500 font-quicksand">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="btn-outline inline-flex items-center gap-2"
            >
              Read All Reviews
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-fredoka text-3xl md:text-4xl font-bold text-[#333333] mb-6">
                Visit Our Store
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFF7E6] rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#FF6B6B]" />
                  </div>
                  <span className="font-quicksand text-gray-700">Dadri, Greater Noida, Uttar Pradesh</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFF7E6] rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#FF6B6B]" />
                  </div>
                  <span className="font-quicksand text-gray-700">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFF7E6] rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#FF6B6B]" />
                  </div>
                  <span className="font-quicksand text-gray-700">Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</span>
                </div>
              </div>
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Get Directions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-card"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.53412345678901!3d28.612345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1abcdef1234%3A0xabcdef1234567890!2sDadri%2C%20Greater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
