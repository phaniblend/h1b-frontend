import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Calculator, 
  FileText, 
  Clock, 
  Settings, 
  Home, 
  CreditCard, 
  Users, 
  HelpCircle, 
  Shield, 
  Award,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Info,
  DollarSign,
  Phone,
  BookOpen,
  UserPlus
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const LeftSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/how-it-works', label: 'How It Works', icon: BookOpen },
    { path: '/pricing', label: 'Pricing', icon: DollarSign },
    { path: '/calculator', label: 'Calculator', icon: Calculator },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  const authenticatedNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/timesheets', label: 'Timesheets', icon: Clock },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/benefits', label: 'Benefits', icon: Award },
    { path: '/compliance', label: 'Compliance', icon: Shield },
    { path: '/green-card', label: 'Green Card', icon: CreditCard },
    { path: '/referral', label: 'Referral Program', icon: Users },
    { path: '/help', label: 'Help & Support', icon: HelpCircle },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <a href="https://capitalrecruiters.net" className="flex items-center space-x-2">
                <img 
                  src="/cap-logo.svg" 
                  alt="Capital Recruiters" 
                  className="w-8 h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg items-center justify-center hidden">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
              </a>
              <Link to="/" className="flex items-center space-x-1" onClick={() => setIsMobileOpen(false)}>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  H1BConnect
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center space-x-2">
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Desktop Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    active 
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="mt-8 pt-4 border-t">
            {!isAuthenticated ? (
              <div className="space-y-2">
                                 <Link
                   to="/login"
                   onClick={() => setIsMobileOpen(false)}
                   className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                     isActive('/login') 
                       ? 'bg-blue-100 text-blue-700' 
                       : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                   }`}
                   title={isCollapsed ? 'Login' : ''}
                 >
                   <User className="h-5 w-5 flex-shrink-0" />
                   {!isCollapsed && <span className="font-medium">Login</span>}
                 </Link>
                 <Link
                   to="/register"
                   onClick={() => setIsMobileOpen(false)}
                   className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700`}
                   title={isCollapsed ? 'Get Started' : ''}
                 >
                   <UserPlus className="h-5 w-5 flex-shrink-0" />
                   {!isCollapsed && <span className="font-medium">Get Started</span>}
                 </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {/* User Profile */}
                <div className={`flex items-center space-x-3 px-3 py-2 ${isCollapsed ? 'justify-center' : ''}`}>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  )}
                </div>

                {/* Profile Settings */}
                                 <Link
                   to="/profile"
                   onClick={() => setIsMobileOpen(false)}
                   className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                     isActive('/profile') 
                       ? 'bg-blue-100 text-blue-700' 
                       : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                   }`}
                   title={isCollapsed ? 'Profile Settings' : ''}
                 >
                   <Settings className="h-5 w-5 flex-shrink-0" />
                   {!isCollapsed && <span className="font-medium">Profile Settings</span>}
                 </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-red-50 hover:text-red-600"
                  title={isCollapsed ? 'Logout' : ''}
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}; 