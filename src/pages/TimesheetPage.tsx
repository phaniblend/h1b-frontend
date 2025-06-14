import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Download, Plus, ArrowLeft } from 'lucide-react';

interface TimesheetEntry {
  id: string;
  weekEnding: string;
  projectName: string;
  hoursPerDay: number[];
  totalHours: number;
  comments?: string;
  status: 'draft' | 'submitted' | 'approved' | 'paid';
  submittedDate?: string;
}

const TimesheetPage = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');
  const [currentTimesheet, setCurrentTimesheet] = useState<Partial<TimesheetEntry>>({
    weekEnding: '',
    projectName: '',
    hoursPerDay: [0, 0, 0, 0, 0, 0, 0],
    comments: ''
  });

  const [timesheetHistory] = useState<TimesheetEntry[]>([
    {
      id: '1',
      weekEnding: '2025-03-07',
      projectName: 'Client ABC - Development',
      hoursPerDay: [8, 8, 8, 8, 8, 0, 0],
      totalHours: 40,
      status: 'paid',
      submittedDate: '2025-03-08'
    },
    {
      id: '2',
      weekEnding: '2025-02-28',
      projectName: 'Client ABC - Development',
      hoursPerDay: [8, 8, 8, 8, 6, 0, 0],
      totalHours: 38,
      status: 'approved',
      submittedDate: '2025-03-01'
    }
  ]);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleHourChange = (dayIndex: number, hours: number) => {
    const newHours = [...(currentTimesheet.hoursPerDay || [])];
    newHours[dayIndex] = Math.max(0, Math.min(24, hours));
    const totalHours = newHours.reduce((sum, h) => sum + h, 0);
    
    setCurrentTimesheet({
      ...currentTimesheet,
      hoursPerDay: newHours,
      totalHours
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle timesheet submission
    console.log('Submitting timesheet:', currentTimesheet);
    // Reset form or show success message
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Timesheets & Payroll</h1>
          <p className="text-gray-600 mt-2">
            Submit your hours and track your earnings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">168 hrs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">YTD Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$45,250</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">1 timesheet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('submit')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'submit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Submit Timesheet
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Timesheet History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'submit' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Week Ending
                    </label>
                    <input
                      type="date"
                      value={currentTimesheet.weekEnding}
                      onChange={(e) => setCurrentTimesheet({
                        ...currentTimesheet,
                        weekEnding: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={currentTimesheet.projectName}
                      onChange={(e) => setCurrentTimesheet({
                        ...currentTimesheet,
                        projectName: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Client ABC - Development"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Hours Worked Each Day
                  </label>
                  <div className="grid grid-cols-7 gap-4">
                    {daysOfWeek.map((day, index) => (
                      <div key={day} className="text-center">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          {day}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={currentTimesheet.hoursPerDay?.[index] || 0}
                          onChange={(e) => handleHourChange(index, parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-lg font-semibold">
                      Total Hours: {currentTimesheet.hoursPerDay?.reduce((sum, h) => sum + h, 0) || 0}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (optional)
                  </label>
                  <textarea
                    value={currentTimesheet.comments}
                    onChange={(e) => setCurrentTimesheet({
                      ...currentTimesheet,
                      comments: e.target.value
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional notes about your work this week..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Timesheet
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Timesheet History</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Earnings Summary
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Week Ending
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hours
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {timesheetHistory.map((timesheet) => (
                        <tr key={timesheet.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timesheet.weekEnding}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timesheet.projectName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timesheet.totalHours}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(timesheet.status)}`}>
                              {timesheet.status.charAt(0).toUpperCase() + timesheet.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {timesheet.submittedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">
                              View
                            </button>
                            {timesheet.status === 'paid' && (
                              <button className="text-green-600 hover:text-green-900">
                                <Download className="h-4 w-4 inline" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {timesheetHistory.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No timesheets submitted yet.</p>
                    <button
                      onClick={() => setActiveTab('submit')}
                      className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Submit your first timesheet
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetPage; 