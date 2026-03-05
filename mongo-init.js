// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

db = db.getSiblingDB('drools_pet_store');

// Create collections
db.createCollection('products');
db.createCollection('categories');
db.createCollection('reviews');
db.createCollection('gallery');
db.createCollection('contacts');
db.createCollection('counters');

// Insert initial categories
db.categories.insertMany([
  {
    _id: 1,
    name: 'dog',
    description: 'Premium nutrition for dogs of all sizes and breeds',
    image_url: '/assets/images/categories/dog.jpg'
  },
  {
    _id: 2,
    name: 'cat',
    description: 'High-quality food formulated for feline health',
    image_url: '/assets/images/categories/cat.jpg'
  },
  {
    _id: 3,
    name: 'bird',
    description: 'Nutritious seeds and treats for pet birds',
    image_url: '/assets/images/categories/bird.jpg'
  },
  {
    _id: 4,
    name: 'fish',
    description: 'Specialized food for aquarium fish',
    image_url: '/assets/images/categories/fish.jpg'
  }
]);

// Insert sample products
db.products.insertMany([
  {
    _id: 1,
    name: 'Premium Adult Dog Food',
    description: 'Complete and balanced nutrition for adult dogs with high-quality protein sources',
    price: 45.99,
    category: 'dog',
    image_url: '/assets/images/products/dog-food-1.jpg',
    stock: 50,
    featured: true
  },
  {
    _id: 2,
    name: 'Kitten Starter Kit',
    description: 'Specially formulated for growing kittens with essential nutrients',
    price: 32.50,
    category: 'cat',
    image_url: '/assets/images/products/cat-food-1.jpg',
    stock: 30,
    featured: true
  },
  {
    _id: 3,
    name: 'Exotic Bird Seed Mix',
    description: 'Premium blend of seeds and nuts for exotic birds',
    price: 18.75,
    category: 'bird',
    image_url: '/assets/images/products/bird-food-1.jpg',
    stock: 75,
    featured: false
  },
  {
    _id: 4,
    name: 'Tropical Fish Flakes',
    description: 'Nutrient-rich flakes for tropical freshwater fish',
    price: 12.99,
    category: 'fish',
    image_url: '/assets/images/products/fish-food-1.jpg',
    stock: 100,
    featured: false
  }
]);

// Initialize counters for auto-incrementing IDs
db.counters.insertMany([
  { _id: 'products', sequence_value: 4 },
  { _id: 'categories', sequence_value: 4 },
  { _id: 'reviews', sequence_value: 0 },
  { _id: 'contacts', sequence_value: 0 },
  { _id: 'gallery', sequence_value: 0 }
]);

// Create indexes for better performance
db.products.createIndex({ category: 1 });
db.products.createIndex({ featured: 1 });
db.products.createIndex({ price: 1 });
db.reviews.createIndex({ approved: 1 });
db.reviews.createIndex({ date: -1 });

print('Database initialized successfully!');
