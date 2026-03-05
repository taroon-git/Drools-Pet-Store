import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, Filter, Upload } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [selectedCategory, images]);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      // Using sample data directly with correct images per category
      const sampleImages = [
        // Dog images (4)
        { id: 1, url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=90', caption: 'Happy Golden Retriever', category: 'dog' },
        { id: 2, url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=90', caption: 'Playful Puppy', category: 'dog' },
        { id: 3, url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=90', caption: 'Cute Dog Portrait', category: 'dog' },
        { id: 4, url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=90', caption: 'Dogs Playing Together', category: 'dog' },
        // Cat images (4)
        { id: 5, url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=90', caption: 'Beautiful Tabby Cat', category: 'cat' },
        { id: 6, url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=90', caption: 'Curious Persian Cat', category: 'cat' },
        { id: 7, url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=90', caption: 'Cute Cat Looking', category: 'cat' },
        { id: 8, url: 'https://images.unsplash.com/photo-1495360019602-e001922271fe?w=800&q=90', caption: 'Relaxing Cat', category: 'cat' },
      ];
      setImages(sampleImages);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      // Limit to max 4 images per category
      const categoryImages = images.filter(img => img.category === selectedCategory);
      setFilteredImages(categoryImages.slice(0, 4));
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now(),
          url: reader.result,
          caption: `Uploaded: ${file.name}`,
          category: 'all'
        };
        setImages(prev => [newImage, ...prev]);
        // Switch to All Pets to show the uploaded image
        setSelectedCategory('all');
        alert('Photo uploaded successfully! It will appear in All Pets section.');
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = [
    { value: 'all', label: 'All Pets', emoji: '🐾' },
    { value: 'dog', label: 'Dogs', emoji: '🐕' },
    { value: 'cat', label: 'Cats', emoji: '🐱' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
            Our <span className="text-[#FF6B6B]">Gallery</span>
          </h1>
          <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
            Glimpses from our store and happy customers
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid - Horizontal scroll for All Pets, Grid for categories */}
        {selectedCategory === 'all' ? (
          /* All Pets - Horizontal scrolling animation */
          <div className="relative overflow-hidden py-4">
            <div className="flex gap-4 animate-scroll-x">
              {[...filteredImages, ...filteredImages].map((image, index) => (
                <motion.div
                  key={`${image.id}-${index}`}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-100 flex-shrink-0 w-72"
                  onClick={() => openImageModal(image)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-quicksand text-sm font-medium">
                        {image.caption}
                      </p>
                      <span className="text-white/80 text-xs capitalize">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Category view - Grid with max 4 images */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-100"
                onClick={() => openImageModal(image)}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-quicksand text-sm font-medium">
                      {image.caption}
                    </p>
                    <div className="flex items-center mt-2">
                      <ZoomIn className="w-4 h-4 text-white mr-2" />
                      <span className="text-white text-xs">Click to enlarge</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-2">
              No images found
            </h3>
            <p className="font-quicksand text-gray-600 mb-4">
              Try selecting a different category
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="btn-primary"
            >
              Show All Images
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white"
        >
          <h2 className="font-fredoka text-3xl font-bold mb-4">
            Share Your Pet's Photo!
          </h2>
          <p className="font-quicksand mb-6 max-w-2xl mx-auto">
            Love our products? Share a photo of your pet enjoying Drools and tag us on social media. 
            Your pet could be featured in our gallery!
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleUploadClick}
              className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Photo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-primary transition-all">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-quicksand text-lg">
                {selectedImage.caption}
              </p>
              <span className="text-gray-300 text-sm capitalize">
                {selectedImage.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
