import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Heart, label: 'Products Sold', value: '50,000+' },
    { icon: Award, label: 'Years in Business', value: '15+' },
    { icon: TrendingUp, label: 'Product Varieties', value: '500+' },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/api/placeholder/200/200',
      bio: 'Passionate about pet nutrition with over 20 years of experience.'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head Veterinarian',
      image: '/api/placeholder/200/200',
      bio: 'Expert in animal health and nutrition, ensuring all products meet highest standards.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      image: '/api/placeholder/200/200',
      bio: 'Dedicated to sourcing the best quality ingredients for our products.'
    },
    {
      name: 'James Wilson',
      role: 'Customer Experience Lead',
      image: '/api/placeholder/200/200',
      bio: 'Ensuring every customer and their pets receive the best service possible.'
    },
  ];

  const milestones = [
    { year: '2008', title: 'Founded', description: 'Started with a small store and a big dream' },
    { year: '2012', title: 'First Product Line', description: 'Launched our signature premium pet food' },
    { year: '2016', title: 'Expansion', description: 'Opened 5 new stores across the country' },
    { year: '2020', title: 'Online Launch', description: 'Brought our products to customers nationwide' },
    { year: '2024', title: 'Innovation Award', description: 'Recognized for excellence in pet nutrition' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About Drools Pet Store
            </h1>
            <p className="font-quicksand text-lg md:text-xl max-w-3xl mx-auto text-white/90">
              Your trusted partner for premium pet nutrition in Dadri
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-quicksand text-gray-600">
                <p>
                  Founded in 2008, Drools Pet Store began as a small family-owned shop with a simple mission: 
                  to provide pets with the same quality nutrition we'd want for our own family members.
                </p>
                <p>
                  What started as a passion project quickly grew into a trusted name in pet care. 
                  Our commitment to quality, transparency, and customer satisfaction has helped us 
                  expand from one small store to a comprehensive pet care destination.
                </p>
                <p>
                  Today, we continue to uphold our founding principles while embracing innovation 
                  in pet nutrition and customer service. Every product on our shelves is carefully 
                  selected and tested to ensure it meets our high standards for quality and safety.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/api/placeholder/600/400"
                alt="Our store and team"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
              Our Impact by Numbers
            </h2>
            <p className="font-quicksand text-gray-600 max-w-2xl mx-auto">
              Growing stronger every day thanks to your trust and support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="font-fredoka text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-quicksand text-gray-600">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="font-quicksand text-gray-600 max-w-2xl mx-auto">
              Key milestones in our growth story
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center mb-8"
              >
                <div className="flex-shrink-0 w-24 text-right pr-4">
                  <span className="font-fredoka text-xl font-bold text-primary">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex-grow pl-4">
                  <h3 className="font-fredoka text-lg font-semibold text-gray-800 mb-1">
                    {milestone.title}
                  </h3>
                  <p className="font-quicksand text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="font-quicksand text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Drools Pet Store
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-fredoka text-lg font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium font-quicksand mb-3">
                    {member.role}
                  </p>
                  <p className="font-quicksand text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="font-quicksand text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-3">
                Pet-First Approach
              </h3>
              <p className="font-quicksand text-gray-600">
                Every decision we make starts with what's best for pets' health and happiness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-3">
                Quality Excellence
              </h3>
              <p className="font-quicksand text-gray-600">
                We never compromise on quality and only offer products we'd give our own pets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-button/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-button" />
              </div>
              <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-3">
                Customer Care
              </h3>
              <p className="font-quicksand text-gray-600">
                We treat every customer like family and provide personalized service and support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
