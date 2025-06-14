import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-xl font-bold">H1BConnect</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering skilled immigrants to take control of their careers and paychecks. 
              No hidden cuts. No middlemen. No nonsense.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@h1bconnect.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>1-800-H1B-HELP</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors">
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link to="/book-advisor" className="text-gray-300 hover:text-white transition-colors">
                  Book Advisor Call
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Capital Recruiters */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Powered By</h3>
            <div className="space-y-3">
              <a 
                href="http://capitalrecruiters.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <span>Capital Recruiters</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              <div className="text-gray-400 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    320 Church Street, Ste. 214<br />
                    Sulphur Springs, TX 75482
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 H1BConnect. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/compliance" className="text-gray-400 hover:text-white text-sm transition-colors">
              Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 