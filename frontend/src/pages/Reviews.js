import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, User, Calendar, Filter } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [newReview, setNewReview] = useState({
    customer_name: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      
      // If no reviews from API, use sample data
      if (data.length === 0) {
        const sampleReviews = [
          {
            id: 1,
            customer_name: 'Sarah Johnson',
            rating: 5,
            comment: 'My dog absolutely loves Drools! His coat is shinier and he has so much more energy. The quality is outstanding and the delivery is always on time.',
            date: new Date('2024-01-15'),
            approved: true
          },
          {
            id: 2,
            customer_name: 'Michael Chen',
            rating: 5,
            comment: 'As a veterinarian, I only recommend the best products to my clients. Drools has consistently exceeded my expectations in terms of nutritional value and ingredient quality.',
            date: new Date('2024-01-10'),
            approved: true
          },
          {
            id: 3,
            customer_name: 'Emily Rodriguez',
            rating: 4,
            comment: 'Great products and excellent customer service. My cats are picky eaters but they love the variety of flavors available. Only wish they had more organic options.',
            date: new Date('2024-01-08'),
            approved: true
          },
          {
            id: 4,
            customer_name: 'James Wilson',
            rating: 5,
            comment: 'Been a customer for 3 years now and I can honestly say this is the best pet food brand out there. My golden retriever is healthy and happy!',
            date: new Date('2024-01-05'),
            approved: true
          },
          {
            id: 5,
            customer_name: 'Lisa Anderson',
            rating: 5,
            comment: 'The subscription service is a game-changer! Never run out of pet food again. The prices are competitive and the quality is unmatched.',
            date: new Date('2024-01-03'),
            approved: true
          },
          {
            id: 6,
            customer_name: 'David Martinez',
            rating: 4,
            comment: 'Good quality products and fast shipping. My birds love the seeds and treats. Website could use some improvements but overall very satisfied.',
            date: new Date('2024-01-01'),
            approved: true
          }
        ];
        setReviews(sampleReviews);
      } else {
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Use sample data on error
      const sampleReviews = [
        {
          id: 1,
          customer_name: 'Sarah Johnson',
          rating: 5,
          comment: 'My dog absolutely loves Drools! His coat is shinier and he has so much more energy.',
          date: new Date('2024-01-15'),
          approved: true
        }
      ];
      setReviews(sampleReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          date: new Date(),
          approved: false // Reviews need admin approval
        }),
      });

      if (response.ok) {
        setNewReview({ customer_name: '', rating: 5, comment: '' });
        alert('Thank you for your review! It will be visible after admin approval.');
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];

    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filter));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const filteredReviews = getFilteredAndSortedReviews();
  const ratingDistribution = getRatingDistribution();

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
            Customer <span className="text-[#FF6B6B]">Reviews</span>
          </h1>
          <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
            See what our happy customers have to say about Drools
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {getAverageRating()}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(getAverageRating()))}
            </div>
            <p className="text-gray-600 font-quicksand">Average Rating</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold text-secondary mb-2">
              {reviews.length}
            </div>
            <p className="text-gray-600 font-quicksand">Total Reviews</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold text-button mb-2">
              {Math.round((reviews.filter(r => r.rating === 5).length / reviews.length) * 100)}%
            </div>
            <p className="text-gray-600 font-quicksand">5-Star Reviews</p>
          </div>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-4">
            Rating Distribution
          </h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-4">
                <div className="flex items-center w-20">
                  {renderStars(rating)}
                  <span className="ml-2 text-sm text-gray-600">({rating})</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                    style={{
                      width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Rating
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {review.customer_name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 font-quicksand">
                          {review.customer_name}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600 font-quicksand">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-lg"
              >
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-2">
                  No reviews found
                </h3>
                <p className="font-quicksand text-gray-600 mb-4">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => { setFilter('all'); setSortBy('recent'); }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>

          {/* Review Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-4">
                Write a Review
              </h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.customer_name}
                    onChange={(e) => setNewReview({ ...newReview, customer_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview({ ...newReview, rating })
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="4"
                    placeholder="Share your experience with our products..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
