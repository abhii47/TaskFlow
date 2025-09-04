import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  BellIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const features = [
    {
      icon: CheckCircleIcon,
      title: 'Smart Task Management',
      description: 'Create, organize, and track your tasks with intelligent deadline management and priority settings.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Gamified Rewards',
      description: 'Earn coins for completing tasks on time and stay motivated with our reward system.',
    },
    {
      icon: BellIcon,
      title: 'Smart Reminders',
      description: 'Get notified 10 minutes before deadlines to ensure you never miss important tasks.',
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Analytics',
      description: 'Visualize your productivity with detailed charts and completion statistics.',
    },
    {
      icon: ClockIcon,
      title: 'Deadline Tracking',
      description: 'Stay on top of your schedule with visual deadline indicators and priority sorting.',
    },
    {
      icon: UserGroupIcon,
      title: 'User-Friendly Interface',
      description: 'Enjoy a clean, intuitive design that makes task management effortless and enjoyable.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <CheckCircleIcon className="h-20 w-20 text-blue-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Stay on Track,{' '}
              <span className="text-green-600">Earn Rewards</span>,{' '}
              <span className="text-blue-600">Manage Smarter</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Transform your productivity with TaskFlow - the intelligent task management system 
              that rewards you for staying organized and meeting deadlines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 hidden lg:block"
        >
          <div className="bg-green-100 p-4 rounded-full">
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-32 right-10 hidden lg:block"
        >
          <div className="bg-blue-100 p-4 rounded-full">
            <ClockIcon className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Maximum Productivity
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay organized, motivated, and productive in one beautiful package.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Productive People
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands who have transformed their productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Active Users</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white"
            >
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Task Completion Rate</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white"
            >
              <div className="text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Tasks Completed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Start your journey to better task management and earn rewards for staying organized.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Free Today
              </Link>
              <Link
                to="/about"
                className="text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;