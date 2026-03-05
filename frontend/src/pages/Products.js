import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [allProducts, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...allProducts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Add to cart logic here
  };

  const handleToggleFavorite = (productId) => {
    console.log('Toggle favorite:', productId);
    // Toggle favorite logic here
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setFilteredProducts(allProducts);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFF7E6]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-[#FFF7E6]">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Our <span className="text-[#FF6B6B]">Products</span>
          </h1>
          <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete range of premium pet nutrition products
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {categories
                .filter(category => category.name !== 'bird' && category.name !== 'fish')
                .map(category => (
                  <option key={category.name} value={category.name}>
                    {category.label}
                  </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-[#FF6B6B] text-white' : 'bg-[#FFF7E6] text-gray-600 hover:bg-[#FFE5B4]'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-[#FF6B6B] text-white' : 'bg-[#FFF7E6] text-gray-600 hover:bg-[#FFE5B4]'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600 font-quicksand">
              Showing {filteredProducts.length} products
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-[#FF6B6B] hover:text-[#FF5252] font-semibold font-quicksand"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="font-fredoka text-xl font-bold text-[#333333] mb-2">
              No products found
            </h3>
            <p className="font-quicksand text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="card p-6 flex items-center gap-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-fredoka text-lg font-bold text-[#333333]">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm font-quicksand line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-bold text-[#FF6B6B] font-fredoka">
                          ₹{product.price}
                        </span>
                        <button className="btn-whatsapp text-sm py-2 px-4">
                          <MessageCircle className="w-4 h-4" />
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
