import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SignupPage = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: '',
  });
  const [step, setStep] = useState('details');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (formData.otp.length !== 6) return;
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      onSignup(formData.email, formData.name);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <div className="flex justify-center">
            <CheckCircleIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Join TaskFlow Today
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account and start managing tasks like a pro
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 'details' ? (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Welcome, <span className="font-medium">{formData.name}</span>!
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a 6-digit OTP to
                </p>
                <p className="font-medium text-gray-900">{formData.email}</p>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-blue-600 hover:text-blue-500 text-sm mt-2"
                >
                  Change details
                </button>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="mt-1 relative">
                  <input
                    id="otp"
                    name="otp"
                    type={showOtp ? 'text' : 'password'}
                    required
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      otp: e.target.value.replace(/\D/g, '')
                    }))}
                    className="block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="000000"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOtp(!showOtp)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showOtp ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Demo: Use any 6-digit number (e.g., 123456)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || formData.otp.length !== 6}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500 text-sm"
                  onClick={() => {
                    setStep('details');
                    setFormData(prev => ({ ...prev, otp: '' }));
                  }}
                >
                  Didn't receive OTP? Resend
                </button>
              </div>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in to existing account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;