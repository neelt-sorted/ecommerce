import React from 'react'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ShopSmart</h3>
          <p className="text-gray-400 mb-4">Your one-stop shop for all your needs.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="/products" className="text-gray-400 hover:text-white">Products</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            <li><a href="/shipping" className="text-gray-400 hover:text-white">Shipping</a></li>
            <li><a href="/returns" className="text-gray-400 hover:text-white">Returns</a></li>
            <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
