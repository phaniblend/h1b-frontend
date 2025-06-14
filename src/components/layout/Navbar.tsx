import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Calculator, FileText, Clock, Settings, Home, CreditCard, Users, HelpCircle, Shield, Award } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="https://capitalrecruiters.net" className="flex items-center space-x-2">
              <img 
                src="/cap-logo.svg" 
                alt="Capital Recruiters" 
                className="w-50 h-10"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl items-center justify-center hidden">
                <span className="text-white font-bold text-lg">H</span>
              </div>
            </a>
            <Link to="/" className="ml-4 flex items-center space-x-2">
              <Home className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                H1BConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                  How It Works
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Pricing
                </Link>
                <Link to="/calculator" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <Calculator className="h-4 w-4 mr-1" />
                  Calculator
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/timesheets" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Timesheets
                </Link>
                <Link to="/documents" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Documents
                </Link>
                <Link to="/benefits" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  Benefits
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span>{user?.firstName || 'User'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link to="/compliance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Compliance
                    </Link>
                    <Link to="/green-card" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Green Card
                    </Link>
                    <Link to="/referral" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Referral Program
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    to="/calculator" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculator
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 bg-blue-600 text-white rounded-lg mx-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/timesheets" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Timesheets
                  </Link>
                  <Link 
                    to="/documents" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Link>
                  <Link 
                    to="/benefits" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Benefits
                  </Link>
                  <Link 
                    to="/compliance" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Compliance
                  </Link>
                  <Link 
                    to="/green-card" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Green Card
                  </Link>
                  <Link 
                    to="/referral" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Referral Program
                  </Link>
                  <Link 
                    to="/help" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 