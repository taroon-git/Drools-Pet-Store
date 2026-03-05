import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I have a question about Drools Pet Store products.");
    window.open(generateWhatsAppUrl(message), '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Pet Street, Animal City, AC 12345',
      color: 'text-primary'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (234) 567-8900',
      color: 'text-secondary',
      action: 'tel:+1234567890'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@droolspetstore.com',
      color: 'text-button',
      action: 'mailto:info@droolspetstore.com'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
      color: 'text-accent'
    }
  ];

  const faqs = [
    {
      question: 'Do you offer home delivery?',
      answer: 'Yes, we offer home delivery within a 50-mile radius. Orders over $50 qualify for free delivery.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, PayPal, and cash on delivery.'
    },
    {
      question: 'Can I return products if my pet doesn\'t like them?',
      answer: 'Yes, we offer a 30-day satisfaction guarantee. If your pet doesn\'t like the product, you can return it for a full refund.'
    },
    {
      question: 'Do you have a loyalty program?',
      answer: 'Yes! Our Paw Rewards program offers points for every purchase, which can be redeemed for discounts and free products.'
    },
    {
      question: 'Are your products veterinarian approved?',
      answer: 'Yes, all our products are formulated with veterinary nutritionists and meet AAFCO standards.'
    }
  ];

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
            Get in <span className="text-[#FF6B6B]">Touch</span>
          </h1>
          <p className="font-quicksand text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us for any queries or orders.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${info.color} bg-opacity-10`}>
                <info.icon className={`w-8 h-8 ${info.color}`} />
              </div>
              <h3 className="font-fredoka text-lg font-semibold text-gray-800 mb-2">
                {info.label}
              </h3>
              {info.action ? (
                <a
                  href={info.action}
                  className="text-gray-600 hover:text-primary transition-colors font-quicksand"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-gray-600 font-quicksand">
                  {info.value}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-fredoka text-2xl font-bold text-green-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-600 font-quicksand mb-4">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb8b1b5%3A0x4f5c5c5c5c5c5c5c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full"
              />
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Chat on WhatsApp</span>
            </button>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-quicksand text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="font-fredoka text-lg font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 font-quicksand">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center"
        >
          <h3 className="font-fredoka text-2xl font-bold mb-4">
            Pet Emergency?
          </h3>
          <p className="font-quicksand mb-6 max-w-2xl mx-auto">
            For urgent pet health concerns, please contact your nearest veterinary emergency clinic immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:911"
              className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Emergency: 911
            </a>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-primary transition-all">
              Find Nearest Vet
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
