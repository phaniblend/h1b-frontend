import React, { useState } from 'react';
import { CreditCard, Calendar, Download, AlertCircle, CheckCircle, Clock, Plus, Edit3, Trash2, DollarSign, TrendingUp } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'bank';
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  receiptUrl?: string;
}

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  items: Array<{
    description: string;
    amount: number;
  }>;
}

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'credit',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true
    },
    {
      id: '2',
      type: 'bank',
      brand: 'Bank Transfer',
      last4: '7890',
      expiryMonth: 0,
      expiryYear: 0,
      isDefault: false
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-11-15',
      description: 'Monthly Service Fee - November 2024',
      amount: 500,
      status: 'completed',
      method: 'Visa •••• 4242',
      receiptUrl: '/receipts/nov-2024.pdf'
    },
    {
      id: '2',
      date: '2024-10-15',
      description: 'Monthly Service Fee - October 2024',
      amount: 500,
      status: 'completed',
      method: 'Visa •••• 4242',
      receiptUrl: '/receipts/oct-2024.pdf'
    },
    {
      id: '3',
      date: '2024-09-01',
      description: 'H1B Transfer Setup Fee',
      amount: 3500,
      status: 'completed',
      method: 'Visa •••• 4242',
      receiptUrl: '/receipts/setup-2024.pdf'
    },
    {
      id: '4',
      date: '2024-12-15',
      description: 'Monthly Service Fee - December 2024',
      amount: 500,
      status: 'pending',
      method: 'Visa •••• 4242'
    }
  ];

  const upcomingInvoices: Invoice[] = [
    {
      id: 'inv-2024-12',
      date: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 500,
      status: 'pending',
      description: 'Monthly Service Fee - December 2024',
      items: [
        { description: 'H1B Service Management', amount: 500 }
      ]
    },
    {
      id: 'inv-2025-01',
      date: '2025-01-01',
      dueDate: '2025-01-15',
      amount: 500,
      status: 'pending',
      description: 'Monthly Service Fee - January 2025',
      items: [
        { description: 'H1B Service Management', amount: 500 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalPaid = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = 42500 - (3500 + (500 * 12)); // Traditional model vs H1BConnect annual cost

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Paid</p>
              <p className="text-2xl font-bold text-blue-900">${totalPaid.toLocaleString()}</p>
              <p className="text-sm text-blue-700">Since September 2024</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Annual Savings</p>
              <p className="text-2xl font-bold text-emerald-900">${totalSavings.toLocaleString()}</p>
              <p className="text-sm text-emerald-700">vs Traditional Model</p>
            </div>
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600">Next Payment</p>
              <p className="text-2xl font-bold text-amber-900">$500</p>
              <p className="text-sm text-amber-700">Due Dec 15, 2024</p>
            </div>
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Model Comparison */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">H1BConnect vs Traditional Model</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional Model */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Traditional Employer Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Billing</span>
                <span className="font-semibold">$170,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employer Cut (25%)</span>
                <span className="font-semibold text-red-600">-$42,500</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Your Take-Home</span>
                  <span className="font-bold text-lg">$127,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* H1BConnect Model */}
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">H1BConnect Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-600">Annual Billing</span>
                <span className="font-semibold">$170,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Setup Fee (One-time)</span>
                <span className="font-semibold">$3,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Monthly Service (×12)</span>
                <span className="font-semibold">$6,000</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-blue-900">Your Take-Home</span>
                  <span className="font-bold text-lg text-emerald-600">$160,500</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold text-emerald-600">Annual Savings</span>
                  <span className="font-bold text-xl text-emerald-600">+$33,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
        
        <div className="space-y-3">
          {upcomingInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{invoice.description}</p>
                  <p className="text-sm text-gray-500">Due {new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${invoice.amount}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                  {getStatusIcon(invoice.status)}
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {transaction.receiptUrl && (
                      <button className="hover:text-blue-800 flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
        <button
          onClick={() => setShowAddPaymentMethod(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className={`bg-white rounded-lg shadow-md p-6 border-2 ${
            method.isDefault ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{method.brand} •••• {method.last4}</p>
                  {method.type !== 'bank' && (
                    <p className="text-sm text-gray-500">Expires {method.expiryMonth}/{method.expiryYear}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.isDefault && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {!method.isDefault && (
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Add Payment Method</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Card
              </button>
              <button
                onClick={() => setShowAddPaymentMethod(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DollarSign },
    { id: 'transactions', label: 'Transactions', icon: Calendar },
    { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payments & Billing</h1>
          <p className="text-lg text-gray-600">Manage your H1BConnect payments and view billing history</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'transactions' && renderTransactions()}
            {activeTab === 'payment-methods' && renderPaymentMethods()}
          </div>
        </div>

        {/* Auto-pay Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Auto-Pay Enabled</h3>
              <p className="text-blue-800 mb-4">
                Your monthly service fee of $500 will be automatically charged to your default payment method (Visa •••• 4242) on the 15th of each month.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Manage Auto-Pay Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage; 