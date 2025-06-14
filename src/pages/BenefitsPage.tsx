import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, TrendingUp, Download, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface BenefitPlan {
  id: string;
  name: string;
  type: 'health' | '401k' | 'other';
  enrolled: boolean;
  premium?: string;
  coverage?: string;
  startDate?: string;
}

const BenefitsPage = () => {
  const [benefits] = useState<BenefitPlan[]>([
    {
      id: '1',
      name: 'Health Insurance - Premium Plan',
      type: 'health',
      enrolled: false,
      premium: '$450/month',
      coverage: 'Individual + Family'
    },
    {
      id: '2',
      name: 'Health Insurance - Basic Plan',
      type: 'health',
      enrolled: false,
      premium: '$250/month',
      coverage: 'Individual Only'
    },
    {
      id: '3',
      name: '401(k) Retirement Plan',
      type: '401k',
      enrolled: true,
      startDate: '2025-03-01'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'health' | '401k'>('overview');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Navigation */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Your Benefits</h1>
          <p className="text-gray-600 mt-2">
            Enroll in health insurance, manage your 401(k), and access benefit resources
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Health Insurance</p>
                <p className="text-lg font-bold text-gray-900">Not Enrolled</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">401(k) Balance</p>
                <p className="text-lg font-bold text-gray-900">$2,450</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Coverage Status</p>
                <p className="text-lg font-bold text-gray-900">Partial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'health'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Health Insurance
              </button>
              <button
                onClick={() => setActiveTab('401k')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === '401k'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                401(k) Plan
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Health Insurance Card */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Heart className="h-6 w-6 text-red-500 mr-3" />
                        <h3 className="text-lg font-semibold">Health Insurance</h3>
                      </div>
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      You are not currently enrolled in health insurance. Protect yourself and your family.
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Enroll Now
                    </button>
                  </div>

                  {/* 401(k) Card */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
                        <h3 className="text-lg font-semibold">401(k) Plan</h3>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-gray-600 mb-2">Current Balance: <span className="font-semibold">$2,450</span></p>
                    <p className="text-gray-600 mb-4">Monthly Contribution: <span className="font-semibold">$500</span></p>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Manage Plan
                    </button>
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Benefit Resources</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Benefits Handbook</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Insurance Cards</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Tax Forms</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                    <p className="text-sm text-yellow-800">
                      Open enrollment period ends in 15 days. Enroll now to avoid waiting until next year.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.filter(b => b.type === 'health').map((plan) => (
                    <div key={plan.id} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600">Premium: <span className="font-medium">{plan.premium}</span></p>
                        <p className="text-gray-600">Coverage: <span className="font-medium">{plan.coverage}</span></p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">✓ Preventive care covered 100%</p>
                        <p className="text-sm text-gray-600">✓ Prescription drug coverage</p>
                        <p className="text-sm text-gray-600">✓ Mental health services</p>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Select Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === '401k' && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-900">401(k) Plan Overview</h3>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-green-700">Current Balance</p>
                      <p className="text-2xl font-bold text-green-900">$2,450</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Monthly Contribution</p>
                      <p className="text-2xl font-bold text-green-900">$500</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Company Match</p>
                      <p className="text-2xl font-bold text-green-900">$250</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Contribution Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Contribution Amount
                        </label>
                        <input
                          type="number"
                          defaultValue="500"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contribution Percentage
                        </label>
                        <input
                          type="number"
                          defaultValue="6"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">% of gross salary</p>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Update Contributions
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Investment Options</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Target Date 2060 Fund</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">S&P 500 Index Fund</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bond Index Fund</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                      Rebalance Portfolio
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Retirement Planning Tools</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Retirement Calculator</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Download Statements</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPage; 