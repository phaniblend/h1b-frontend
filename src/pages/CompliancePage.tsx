import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, CheckCircle, Clock, Download, Upload, FileText, Calendar, Home } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  status: 'compliant' | 'warning' | 'expired' | 'pending';
  expiryDate: string;
  description: string;
  action?: string;
}

const CompliancePage = () => {
  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'H-1B Status',
      status: 'compliant',
      expiryDate: '2025-09-30',
      description: 'Current H-1B petition valid until September 2025',
      action: 'Monitor for extension needs'
    },
    {
      id: '2',
      title: 'I-94 Record',
      status: 'compliant',
      expiryDate: '2025-09-30',
      description: 'I-94 record matches H-1B petition dates',
      action: 'Download latest I-94'
    },
    {
      id: '3',
      title: 'State Registration',
      status: 'warning',
      expiryDate: '2024-06-15',
      description: 'Professional license renewal due soon',
      action: 'Renew state professional license'
    },
    {
      id: '4',
      title: 'Employment Authorization',
      status: 'compliant',
      expiryDate: '2025-09-30',
      description: 'Authorized to work for current employer',
      action: 'Maintain employment status'
    },
    {
      id: '5',
      title: 'Tax Compliance',
      status: 'pending',
      expiryDate: '2024-04-15',
      description: '2023 tax return filing pending',
      action: 'File tax return with CPA'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'expired':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'pending':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'warning':
        return 'Action Needed';
      case 'expired':
        return 'Expired';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const compliantCount = complianceItems.filter(item => item.status === 'compliant').length;
  const warningCount = complianceItems.filter(item => item.status === 'warning').length;
  const expiredCount = complianceItems.filter(item => item.status === 'expired').length;
  const pendingCount = complianceItems.filter(item => item.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
          <p className="text-xl text-gray-600">Monitor your immigration and employment compliance status</p>
        </div>

        {/* Compliance Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">{compliantCount}</h3>
            <p className="text-gray-600">Compliant</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-600">{warningCount}</h3>
            <p className="text-gray-600">Need Action</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-600">{expiredCount}</h3>
            <p className="text-gray-600">Expired</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">{pendingCount}</h3>
            <p className="text-gray-600">Pending</p>
          </div>
        </div>

        {/* Urgent Actions */}
        {(warningCount > 0 || expiredCount > 0) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-xl font-bold text-red-900">Urgent Actions Required</h2>
            </div>
            <div className="space-y-3">
              {complianceItems
                .filter(item => item.status === 'warning' || item.status === 'expired')
                .map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.action}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Due: {item.expiryDate}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Compliance Items */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Status</h2>
          
          <div className="space-y-4">
            {complianceItems.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      {item.action && (
                        <p className="text-sm text-blue-600 font-medium">{item.action}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Expires: {item.expiryDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Downloads */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">CPA Reports & Documents</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">2023 W-2 Form</h3>
                    <p className="text-sm text-gray-600">Tax year 2023 earnings statement</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Payroll Summary</h3>
                    <p className="text-sm text-gray-600">YTD payroll and deductions</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Employment Verification</h3>
                    <p className="text-sm text-gray-600">Letter of employment verification</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Expiry Reminders</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                  <h3 className="font-semibold text-yellow-900">State License Renewal</h3>
                </div>
                <p className="text-yellow-800 text-sm mb-3">
                  Your professional license expires on June 15, 2024. Renewal required to maintain compliance.
                </p>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                  Start Renewal Process
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Tax Filing Reminder</h3>
                </div>
                <p className="text-blue-800 text-sm mb-3">
                  2023 tax return filing deadline is April 15, 2024. Schedule appointment with CPA.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Schedule CPA Meeting
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-900">H-1B Status</h3>
                </div>
                <p className="text-green-800 text-sm">
                  Your H-1B status is valid until September 30, 2025. No immediate action required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Documents */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Compliance Documents</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload License Renewal</h3>
              <p className="text-gray-600 mb-4">Upload your renewed professional license</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Tax Documents</h3>
              <p className="text-gray-600 mb-4">Upload completed tax returns or related documents</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage; 