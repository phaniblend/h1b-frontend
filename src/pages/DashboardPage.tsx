import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊', route: '/dashboard' },
    { id: 'application', label: 'H1B Application', icon: '📋', route: '/application' },
    { id: 'documents', label: 'Documents', icon: '📄', route: '/documents' },
    { id: 'timesheets', label: 'Timesheets', icon: '⏰', route: '/timesheets' },
    { id: 'payments', label: 'Payments', icon: '💳', route: '/payments' },
    { id: 'compliance', label: 'Compliance', icon: '✅', route: '/compliance' },
    { id: 'reports', label: 'Reports', icon: '📈', route: '/reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', route: '/profile' },
  ];

  const stats = [
    {
      title: 'Application Status',
      value: 'In Progress',
      subtext: '75% Complete',
      icon: '📋',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
    {
      title: 'Annual Savings',
      value: '$33,000',
      subtext: 'vs Traditional Model',
      icon: '💰',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
    },
    {
      title: 'Documents',
      value: '85%',
      subtext: 'Completion Rate',
      icon: '📄',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50',
    },
    {
      title: 'Next Payment',
      value: '$500',
      subtext: 'Due Dec 15',
      icon: '💳',
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-50',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Document uploaded', item: 'Diploma Certificate', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Application reviewed', item: 'Form I-129', time: '1 day ago', status: 'pending' },
    { id: 3, action: 'Payment processed', item: '$500 Monthly Fee', time: '3 days ago', status: 'success' },
    { id: 4, action: 'Timesheet submitted', item: 'November 2024', time: '1 week ago', status: 'success' },
  ];

  const quickActions = [
    { id: 1, title: 'Upload Document', icon: '📤', color: 'blue' },
    { id: 2, title: 'Submit Timesheet', icon: '⏰', color: 'emerald' },
    { id: 3, title: 'Make Payment', icon: '💳', color: 'violet' },
    { id: 4, title: 'Contact Support', icon: '💬', color: 'cyan' },
  ];

  const handleSidebarNavigation = (item: { id: string; route: string }) => {
    if (item.id === 'overview') {
      setActiveSection('overview');
    } else {
      navigate(item.route);
    }
    setIsSidebarOpen(false); // Close mobile sidebar
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
          
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              H1BConnect
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-white hover:text-cyan-400 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSidebarNavigation(item)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all transform hover:scale-105 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-6 border-t border-white/10">
            <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-4 border border-white/20">
              <h3 className="font-semibold text-cyan-400 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-200 mb-3">Get expert support for your H1B journey</p>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          {/* Top Bar */}
          <div className="bg-white shadow-sm border-b border-slate-200 h-20 flex items-center justify-between px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-slate-600 hover:text-slate-900 mr-4"
              >
                <span className="text-2xl">☰</span>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeSection}</h2>
                <p className="text-slate-600">Welcome back to your H1B dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-semibold">JD</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <span className="text-xl">{stat.icon}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                          <div className="text-sm text-slate-600">{stat.subtext}</div>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-700">{stat.title}</h3>
                    </div>
                  ))}
                </div>

                {/* Quick Actions - Mobile Responsive */}
                <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        className={`p-4 rounded-2xl border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-all transform hover:scale-105 active:scale-95 text-center`}
                      >
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <div className={`font-semibold text-${action.color}-700 text-sm`}>{action.title}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Two Column Layout for Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Application Progress */}
                  <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Application Progress</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">Personal Information</span>
                        <span className="text-emerald-600 font-semibold">✓ Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-full"></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">Documentation</span>
                        <span className="text-blue-600 font-semibold">85% Complete</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-4/5"></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">Legal Review</span>
                        <span className="text-amber-600 font-semibold">Pending</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                          <div className={`w-3 h-3 rounded-full ${
                            activity.status === 'success' ? 'bg-emerald-500' : 
                            activity.status === 'pending' ? 'bg-amber-500' : 'bg-slate-400'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate">{activity.action}</p>
                            <p className="text-sm text-slate-600 truncate">{activity.item}</p>
                          </div>
                          <div className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Savings Breakdown */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-lg p-6 border border-emerald-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Annual Savings Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">$42,500</div>
                      <div className="text-slate-600">Traditional Employer Cut</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">$9,500</div>
                      <div className="text-slate-600">H1BConnect Annual Fees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">$33,000</div>
                      <div className="text-slate-600">Your Annual Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Sections Placeholder */}
            {activeSection !== 'overview' && (
              <div className="bg-white rounded-3xl shadow-lg p-8 text-center border border-slate-100">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 capitalize">{activeSection} Section</h3>
                <p className="text-slate-600 text-lg">This section is coming soon. We're building amazing features for your H1B journey.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 