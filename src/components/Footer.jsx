import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import ProtectedLink from "./ProtectedLink";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DS</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                DevStore
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Your trusted online marketplace for quality products at amazing
              prices. Discover thousands of items with fast shipping and
              excellent customer service.
            </p>

            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigate("/")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/products")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/products")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Categories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigate("/contact")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("/faq")}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                >
                  FAQ
                </button>
              </li>
              <li>
                <ProtectedLink
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  protectedAction="view shipping information"
                >
                  Shipping Info
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  protectedAction="track your orders"
                >
                  Track Your Order
                </ProtectedLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Commerce Street, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary-600 dark:hover:text-primary-400"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href="mailto:support@simplestore.com"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary-600 dark:hover:text-primary-400"
                >
                  support@simplestore.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Newsletter
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Get updates on new products and special offers
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg text-sm text-gray-900 dark:text-white"
                />
                <button className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  On orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  SSL encrypted checkout
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  30-day return policy
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  24/7 Support
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Expert customer service
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} Simple Store. All rights reserved.
              </p>

              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                We Accept:
              </p>
              <div className="flex items-center space-x-2">
                {["Visa", "Mastercard", "PayPal", "Apple Pay"].map(
                  (payment) => (
                    <div
                      key={payment}
                      className="w-8 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center"
                    >
                      <CreditCard className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 py-4">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>by Simple Store Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
