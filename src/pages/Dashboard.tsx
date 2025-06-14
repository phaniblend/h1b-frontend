import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  Shield, 
  DollarSign, 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Users,
  ArrowLeft
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();

  // Mock data - in real app, this would come from API
  const transferStatus = {
    step: 2,
    totalSteps: 6,
    currentStep: 'Legal Review',
    steps: [
      { name: 'Documents Uploaded', completed: true },
      { name: 'Legal Review', completed: false, current: true },
      { name: 'Client Approved', completed: false },
      { name: 'Filing Submitted', completed: false },
      { name: 'USCIS Processing', completed: false },
      { name: 'Approved', completed: false }
    ]
  };

  const alerts = [
    {
      type: 'warning',
      message: 'Missing: End Client Letter. Please upload to continue onboarding.',
      action: 'Upload Document'
    },
    {
      type: 'info',
      message: 'Your pay stub for March 2025 is now available for download.',
      action: 'Download'
    }
  ];

  const stats = [
    {
      name: 'YTD Earnings',
      value: '$45,250',
      icon: DollarSign,
      color: 'green'
    },
    {
      name: 'Hours This Month',
      value: '168',
      icon: Clock,
      color: 'blue'
    },
    {
      name: 'H-1B Status',
      value: 'Active',
      icon: Shield,
      color: 'purple'
    },
    {
      name: 'Days Until Expiry',
      value: '245',
      icon: Calendar,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Navigation */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">Here's your current status and recent activity.</p>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle
                      className={`h-5 w-5 mr-3 ${
                        alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`}
                    />
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  </div>
                  <button
                    className={`text-sm font-medium px-3 py-1 rounded ${
                      alert.type === 'warning'
                        ? 'text-yellow-800 bg-yellow-200 hover:bg-yellow-300'
                        : 'text-blue-800 bg-blue-200 hover:bg-blue-300'
                    } transition-colors`}
                  >
                    {alert.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              green: 'bg-green-100 text-green-600',
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600'
            };

            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* H-1B Transfer Status */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">H-1B Transfer Status</h2>
              <p className="text-sm text-gray-600 mt-1">
                Step {transferStatus.step} of {transferStatus.totalSteps}: {transferStatus.currentStep}
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transferStatus.steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : step.current ? (
                        <div className="h-6 w-6 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className={`text-sm font-medium ${
                        step.completed ? 'text-green-700' : 
                        step.current ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex space-x-3">
                <Link
                  to="/documents"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Additional Documents
                </Link>
                <Link
                  to="/help"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Pay & Timesheets */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Pay & Timesheets</h3>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  to="/timesheets"
                  className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                >
                  Submit Timesheet
                </Link>
                <button className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors">
                  Download Pay Stub
                </button>
                <Link
                  to="/timesheets"
                  className="block w-full text-blue-600 px-4 py-2 text-center font-medium hover:text-blue-800 transition-colors"
                >
                  View Earnings Summary
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to="/benefits"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Enroll in Health Insurance
                </Link>
                <Link
                  to="/benefits"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Manage 401(k)
                </Link>
                <Link
                  to="/benefits"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Download Benefits Guide
                </Link>
              </div>
            </div>

            {/* Compliance Reminders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Compliance</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">H-1B expires in 245 days</span>
                  <Link
                    to="/compliance"
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    Renew Now
                  </Link>
                </div>
                <div className="text-sm text-gray-600">
                  All documents up to date ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 