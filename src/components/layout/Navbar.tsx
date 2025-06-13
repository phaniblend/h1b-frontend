import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                H1BConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="http://capitalrecruiters.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Capital Recruiters</span>
            </a>
            <Link
              to="/calculator"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Calculator
            </Link>
            <Link
              to="/book-advisor"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Book Advisor
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-slate-700 font-medium">{user?.firstName}</span>
                  </div>
                <button
                  onClick={logout}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-medium hover:bg-slate-200 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-slate-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="http://capitalrecruiters.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🏠</span>
                  <span>Capital Recruiters Home</span>
                </div>
              </a>
              
              <Link
                to="/calculator"
                className="block px-3 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🧮</span>
                  <span>Savings Calculator</span>
                </div>
              </Link>
              
              <Link
                to="/book-advisor"
                className="block px-3 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">👥</span>
                  <span>Book Advisor</span>
                </div>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">📊</span>
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  
                  <div className="px-3 py-3 border-t border-slate-100 mt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user?.firstName?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-slate-600">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors duration-200 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-3 py-3 border-t border-slate-100 mt-4 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 