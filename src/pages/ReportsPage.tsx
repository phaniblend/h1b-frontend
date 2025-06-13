import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  PieChart,
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Briefcase
} from 'lucide-react';

interface ReportMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  category: 'filing' | 'payment' | 'compliance' | 'milestone';
}

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('all');

  const metrics: ReportMetric[] = [
    {
      id: '1',
      title: 'Total Savings Achieved',
      value: '$34,700',
      change: '+$2,100 vs traditional',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: '2',
      title: 'Transfer Progress',
      value: '78%',
      change: '+12% this month',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: '3',
      title: 'Processing Time',
      value: '24 days',
      change: '6 days faster than average',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      id: '4',
      title: 'Compliance Score',
      value: '97%',
      change: '+2% improvement',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-emerald-600'
    }
  ];

  const savingsBreakdown: ChartData[] = [
    { label: 'Employer Cut Saved', value: 42500, color: '#10B981' },
    { label: 'H1BConnect Fees', value: 9500, color: '#3B82F6' },
    { label: 'Net Savings', value: 33000, color: '#059669' }
  ];

  const transferProgress: ChartData[] = [
    { label: 'Application Filed', value: 100 },
    { label: 'Premium Processing', value: 100 },
    { label: 'USCIS Review', value: 85 },
    { label: 'Approval Pending', value: 60 },
    { label: 'Transfer Complete', value: 0 }
  ];

  const complianceData: ChartData[] = [
    { label: 'Immigration (USCIS)', value: 95, color: '#10B981' },
    { label: 'Employment (DOL)', value: 98, color: '#3B82F6' },
    { label: 'Tax (IRS)', value: 100, color: '#8B5CF6' },
    { label: 'Corporate', value: 96, color: '#F59E0B' }
  ];

  const timeline: TimelineEvent[] = [
    {
      date: '2024-11-15',
      title: 'USCIS Receipt Notice',
      description: 'Form I-129 petition received and processing initiated',
      status: 'completed',
      category: 'filing'
    },
    {
      date: '2024-11-10',
      title: 'Premium Processing Filed',
      description: 'Form I-907 submitted for expedited processing',
      status: 'completed',
      category: 'filing'
    },
    {
      date: '2024-11-01',
      title: 'Initial Payment Processed',
      description: 'Setup fee of $3,500 successfully processed',
      status: 'completed',
      category: 'payment'
    },
    {
      date: '2024-10-25',
      title: 'LCA Certification',
      description: 'Department of Labor certification received',
      status: 'completed',
      category: 'compliance'
    },
    {
      date: '2024-12-01',
      title: 'USCIS Interview (if required)',
      description: 'Potential interview scheduling based on case complexity',
      status: 'pending',
      category: 'milestone'
    },
    {
      date: '2024-12-15',
      title: 'Expected Approval',
      description: 'Target completion date for H1B transfer approval',
      status: 'pending',
      category: 'milestone'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(metric.trend)}
                  <span className="text-xs text-gray-500">{metric.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-50`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Savings Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Annual Salary</span>
              <span className="font-medium">$170,000</span>
            </div>
            <div className="space-y-2">
              {savingsBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="font-medium">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total Annual Savings</span>
                <span className="text-lg font-bold text-green-600">$33,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Progress</h3>
          <div className="space-y-4">
            {transferProgress.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{step.label}</span>
                    <span className="text-sm font-medium">{step.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        step.value === 100 ? 'bg-green-500' : 
                        step.value > 0 ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${step.value}%` }}
                    ></div>
                  </div>
                </div>
                {step.value === 100 && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 mb-2">Return on Investment Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-700">Investment: </span>
                <span className="font-bold text-green-900">$9,500</span>
              </div>
              <div>
                <span className="text-green-700">Annual Savings: </span>
                <span className="font-bold text-green-900">$33,000</span>
              </div>
              <div>
                <span className="text-green-700">ROI: </span>
                <span className="font-bold text-green-900">347%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Total Payments</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">$4,500</p>
          <p className="text-sm text-gray-600">Setup + 2 monthly payments</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Projected Savings</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">$104,100</p>
          <p className="text-sm text-gray-600">Over 3 years vs employer model</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Savings Rate</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">94.4%</p>
          <p className="text-sm text-gray-600">Of salary retained vs traditional</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Breakdown Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Traditional Employer Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Salary</span>
                <span className="font-medium">$170,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employer Cut (25%)</span>
                <span className="font-medium text-red-600">-$42,500</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Your Take-Home</span>
                  <span className="font-bold">$127,500</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">H1BConnect Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Salary</span>
                <span className="font-medium">$170,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Setup Fee</span>
                <span className="font-medium text-blue-600">-$3,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Fee (12 months)</span>
                <span className="font-medium text-blue-600">-$6,000</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Your Take-Home</span>
                  <span className="font-bold text-green-600">$160,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-green-900">Annual Advantage</span>
            <span className="text-2xl font-bold text-green-600">+$33,000</span>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nov 1, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Setup Fee</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$3,500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nov 15, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Monthly Service Fee</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dec 15, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Monthly Service Fee</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Due
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-400 text-sm">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      {/* Compliance Score */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Score by Category</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke={item.color}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - item.value / 100)}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Transfer Timeline</h3>
        
        <div className="space-y-6">
          {timeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  event.status === 'completed' ? 'bg-green-500' :
                  event.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
                {index < timeline.length - 1 && (
                  <div className="w-px h-12 bg-gray-200 mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                    {event.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Reports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Financial Summary</h4>
                <p className="text-sm text-gray-600">Complete payment and savings report</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Download PDF
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Compliance Report</h4>
                <p className="text-sm text-gray-600">Legal compliance and audit trail</p>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Download PDF
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-8 h-8 text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">Tax Summary</h4>
                <p className="text-sm text-gray-600">Tax-ready expense documentation</p>
              </div>
            </div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Download PDF
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <h4 className="font-medium text-gray-900">Timeline Report</h4>
                <p className="text-sm text-gray-600">Complete transfer timeline</p>
              </div>
            </div>
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Download PDF
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
              <div>
                <h4 className="font-medium text-gray-900">Team Activity</h4>
                <p className="text-sm text-gray-600">Advisor and support interactions</p>
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Download PDF
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:border-teal-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-teal-600" />
              <div>
                <h4 className="font-medium text-gray-900">Complete Package</h4>
                <p className="text-sm text-gray-600">All reports in one download</p>
              </div>
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Download ZIP
            </button>
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Report Builder</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Report Parameters</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
                <div className="space-y-2">
                  {['Financial Summary', 'Compliance Status', 'Timeline', 'Team Activity', 'Documents'].map((section) => (
                    <label key={section} className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{section}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Output Format</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="space-y-2">
                  {['PDF Report', 'Excel Spreadsheet', 'CSV Data', 'JSON Export'].map((format) => (
                    <label key={format} className="flex items-center">
                      <input type="radio" name="format" value={format} defaultChecked={format === 'PDF Report'} className="border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{format}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'exports', label: 'Reports & Exports', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Analytics</h1>
          <p className="text-lg text-gray-600">Comprehensive insights into your H1B transfer journey</p>
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
            {activeTab === 'financial' && renderFinancial()}
            {activeTab === 'compliance' && renderCompliance()}
            {activeTab === 'exports' && renderExports()}
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">H1BConnect Performance Summary</h3>
              <p className="text-blue-800">
                Your H1B transfer is 78% complete with $33,000 in annual savings achieved. 
                Stay on track for approval by December 15th with 97% compliance score maintained.
              </p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Download Executive Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;