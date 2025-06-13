import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Calendar, Users, Building, Eye, Download, Bell, Gavel, Search } from 'lucide-react';

interface ComplianceItem {
  id: string;
  category: 'immigration' | 'employment' | 'tax' | 'corporate';
  title: string;
  description: string;
  status: 'compliant' | 'warning' | 'action-required' | 'pending';
  dueDate?: string;
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
  documentRequired?: boolean;
  assignedTo?: string;
}

interface RegulatoryUpdate {
  id: string;
  date: string;
  title: string;
  type: 'rule-change' | 'fee-update' | 'policy-update' | 'deadline-change';
  impact: 'high' | 'medium' | 'low';
  summary: string;
  actionRequired: boolean;
  deadline?: string;
}

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: string;
  details: string;
  ipAddress: string;
}

const CompliancePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      category: 'immigration',
      title: 'H1B Transfer Filing (I-129)',
      description: 'Submit H1B transfer petition to USCIS with all required documentation',
      status: 'compliant',
      lastUpdated: '2024-11-01',
      priority: 'high',
      documentRequired: true,
      assignedTo: 'Sarah Chen'
    },
    {
      id: '2',
      category: 'immigration',
      title: 'Premium Processing Election',
      description: 'File Form I-907 for expedited processing (15 calendar days)',
      status: 'compliant',
      lastUpdated: '2024-11-01',
      priority: 'medium',
      documentRequired: true,
      assignedTo: 'Sarah Chen'
    },
    {
      id: '3',
      category: 'employment',
      title: 'Labor Condition Application (LCA)',
      description: 'DOL certification for prevailing wage and working conditions',
      status: 'action-required',
      dueDate: '2024-12-15',
      lastUpdated: '2024-11-10',
      priority: 'high',
      documentRequired: true,
      assignedTo: 'Raj Patel'
    },
    {
      id: '4',
      category: 'employment',
      title: 'Public Access File Maintenance',
      description: 'Maintain required documents available for public inspection',
      status: 'warning',
      dueDate: '2024-12-01',
      lastUpdated: '2024-10-15',
      priority: 'medium',
      assignedTo: 'Maria Rodriguez'
    },
    {
      id: '5',
      category: 'corporate',
      title: 'Form I-9 Employment Eligibility',
      description: 'Complete and maintain I-9 forms for employment authorization',
      status: 'compliant',
      lastUpdated: '2024-11-05',
      priority: 'high',
      documentRequired: true,
      assignedTo: 'Maria Rodriguez'
    },
    {
      id: '6',
      category: 'tax',
      title: 'Payroll Tax Compliance',
      description: 'Ensure proper payroll tax withholding and reporting',
      status: 'compliant',
      lastUpdated: '2024-11-01',
      priority: 'medium',
      assignedTo: 'Finance Team'
    },
    {
      id: '7',
      category: 'immigration',
      title: 'H1B Cap Registration (H-1B1)',
      description: 'Annual registration for H1B cap-subject positions',
      status: 'pending',
      dueDate: '2025-03-01',
      lastUpdated: '2024-11-01',
      priority: 'high',
      assignedTo: 'Sarah Chen'
    }
  ];

  const regulatoryUpdates: RegulatoryUpdate[] = [
    {
      id: '1',
      date: '2024-11-15',
      title: 'USCIS Fee Schedule Update - Effective January 2025',
      type: 'fee-update',
      impact: 'medium',
      summary: 'Form I-129 filing fees will increase from $460 to $580. Premium processing remains at $2,805.',
      actionRequired: true,
      deadline: '2025-01-01'
    },
    {
      id: '2',
      date: '2024-11-01',
      title: 'New H1B Specialty Occupation Requirements',
      type: 'rule-change',
      impact: 'high',
      summary: 'Updated guidelines for demonstrating specialty occupation requirements with enhanced documentation standards.',
      actionRequired: true,
      deadline: '2024-12-31'
    },
    {
      id: '3',
      date: '2024-10-15',
      title: 'DOL Prevailing Wage Determination Updates',
      type: 'policy-update',
      impact: 'medium',
      summary: 'New methodology for determining prevailing wages in certain geographic areas.',
      actionRequired: false
    },
    {
      id: '4',
      date: '2024-10-01',
      title: 'Electronic I-9 Compliance Guidelines',
      type: 'rule-change',
      impact: 'low',
      summary: 'Updated guidelines for electronic storage and management of Form I-9 documents.',
      actionRequired: false
    }
  ];

  const auditTrail: AuditEntry[] = [
    {
      id: '1',
      timestamp: '2024-11-15 14:30:00',
      user: 'Sarah Chen',
      action: 'Updated Compliance Status',
      category: 'Immigration',
      details: 'Marked H1B Transfer Filing as Compliant - USCIS Receipt Notice received',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-11-15 11:15:00',
      user: 'Raj Patel',
      action: 'Document Upload',
      category: 'Employment',
      details: 'Uploaded LCA certification documents for DOL compliance',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      timestamp: '2024-11-14 16:45:00',
      user: 'Maria Rodriguez',
      action: 'Compliance Review',
      category: 'Corporate',
      details: 'Completed quarterly I-9 audit and updated public access file',
      ipAddress: '192.168.1.102'
    },
    {
      id: '4',
      timestamp: '2024-11-14 09:30:00',
      user: 'System Admin',
      action: 'Regulatory Update',
      category: 'System',
      details: 'Added new USCIS fee schedule update notification',
      ipAddress: '10.0.0.1'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'action-required': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'action-required': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = complianceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const complianceStats = {
    total: complianceItems.length,
    compliant: complianceItems.filter(item => item.status === 'compliant').length,
    warning: complianceItems.filter(item => item.status === 'warning').length,
    actionRequired: complianceItems.filter(item => item.status === 'action-required').length,
    pending: complianceItems.filter(item => item.status === 'pending').length
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Compliance Score */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Compliance Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold">
                {Math.round((complianceStats.compliant / complianceStats.total) * 100)}%
              </div>
              <div className="text-emerald-100">
                <p className="text-sm">{complianceStats.compliant} of {complianceStats.total} items compliant</p>
                <p className="text-xs">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Shield className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-green-600">{complianceStats.compliant}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{complianceStats.warning}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Action Required</p>
              <p className="text-2xl font-bold text-red-600">{complianceStats.actionRequired}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{complianceStats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Activity</h3>
        <div className="space-y-4">
          {auditTrail.slice(0, 5).map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{entry.action}</p>
                  <span className="text-xs text-gray-500">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600">{entry.details}</p>
                <p className="text-xs text-gray-500">by {entry.user} • {entry.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search compliance requirements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="immigration">Immigration</option>
            <option value="employment">Employment</option>
            <option value="tax">Tax</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(item.status)}
                      {item.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{item.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium capitalize">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <span className="ml-2 font-medium">{item.assignedTo}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 font-medium">{new Date(item.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  {item.dueDate && (
                    <div>
                      <span className="text-gray-500">Due Date:</span>
                      <span className="ml-2 font-medium text-red-600">{new Date(item.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {item.documentRequired && (
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpdates = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Regulatory Updates</h3>
        
        <div className="space-y-4">
          {regulatoryUpdates.map((update) => (
            <div key={update.id} className="border-l-4 border-blue-500 pl-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{update.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(update.impact)}`}>
                      {update.impact.toUpperCase()} IMPACT
                    </span>
                    {update.actionRequired && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        ACTION REQUIRED
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{update.summary}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Published: {new Date(update.date).toLocaleDateString()}</span>
                    </div>
                    {update.deadline && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Deadline: {new Date(update.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Gavel className="w-4 h-4" />
                      <span className="capitalize">{update.type.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAuditTrail = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Audit Trail</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditTrail.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {entry.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'requirements', label: 'Requirements', icon: FileText },
    { id: 'updates', label: 'Regulatory Updates', icon: Bell },
    { id: 'audit', label: 'Audit Trail', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Compliance Management</h1>
          <p className="text-lg text-gray-600">Monitor and maintain H1B transfer compliance requirements</p>
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
            {activeTab === 'requirements' && renderRequirements()}
            {activeTab === 'updates' && renderUpdates()}
            {activeTab === 'audit' && renderAuditTrail()}
          </div>
        </div>

        {/* Compliance Certificate */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">H1BConnect Compliance Certification</h3>
              <p className="text-blue-800">
                Your H1B transfer is being managed in full compliance with USCIS, DOL, and IRS requirements. 
                Our legal team ensures all documentation and filings meet current regulatory standards.
              </p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage; 