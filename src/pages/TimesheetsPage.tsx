import React, { useState } from 'react';
import { Calendar, Upload, FileText, Plus, Eye, Trash2, Check, Clock } from 'lucide-react';

interface TimesheetDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

interface WeeklyTimesheet {
  id: string;
  weekStart: string;
  weekEnd: string;
  totalHours: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  documents: TimesheetDocument[];
  submittedDate?: string;
  approvedDate?: string;
}

const TimesheetsPage = () => {
  const [timesheets, setTimesheets] = useState<WeeklyTimesheet[]>([
    {
      id: '1',
      weekStart: '2024-11-04',
      weekEnd: '2024-11-10',
      totalHours: 40,
      status: 'approved',
      submittedDate: '2024-11-11',
      approvedDate: '2024-11-12',
      documents: [
        {
          id: 'doc1',
          name: 'timesheet_approval_email.pdf',
          type: 'application/pdf',
          size: '234 KB',
          uploadDate: '2024-11-11'
        }
      ]
    },
    {
      id: '2',
      weekStart: '2024-11-11',
      weekEnd: '2024-11-17',
      totalHours: 38,
      status: 'submitted',
      submittedDate: '2024-11-18',
      documents: [
        {
          id: 'doc2',
          name: 'weekly_timesheet.xlsx',
          type: 'application/excel',
          size: '45 KB',
          uploadDate: '2024-11-18'
        }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTimesheet, setNewTimesheet] = useState({
    weekStart: '',
    weekEnd: '',
    totalHours: ''
  });
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileUpload = async (files: File[], timesheetId: string) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'message/rfc822', // Email files
      'text/plain',
      'image/jpeg',
      'image/png'
    ];

    const validFiles: File[] = [];
    
    for (const file of files) {
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB. Your file is ${formatFileSize(file.size)}.`);
        continue;
      }
      
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        alert(`File "${file.name}" is not a supported format. Please upload PDF, Excel, email, or image files.`);
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Process files sequentially to avoid duplicate IDs
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      // Create truly unique ID with timestamp, random string, and file name hash
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 12);
      const fileHash = file.name.replace(/[^a-zA-Z0-9]/g, '').substr(0, 8);
      const fileId = `doc_${timestamp}_${i}_${random}_${fileHash}`;
      
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Add delay between files to ensure unique timestamps
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Simulate upload with progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(uploadInterval);
            
            // Add document to timesheet after upload completes
            const newDoc: TimesheetDocument = {
              id: fileId,
              name: file.name,
              type: file.type,
              size: formatFileSize(file.size),
              uploadDate: new Date().toISOString().split('T')[0]
            };
            
            setTimesheets(prev => 
              prev.map(ts => 
                ts.id === timesheetId 
                  ? { ...ts, documents: [...ts.documents, newDoc] }
                  : ts
              )
            );
            
            // Clean up progress indicator
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
            
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 12 };
        });
      }, 180);
    }
  };

  const handleAddTimesheet = () => {
    if (!newTimesheet.weekStart || !newTimesheet.weekEnd || !newTimesheet.totalHours) {
      alert('Please fill in all fields');
      return;
    }

    const newEntry: WeeklyTimesheet = {
      id: Date.now().toString(),
      weekStart: newTimesheet.weekStart,
      weekEnd: newTimesheet.weekEnd,
      totalHours: parseInt(newTimesheet.totalHours),
      status: 'draft',
      documents: []
    };

    setTimesheets(prev => [newEntry, ...prev]);
    setNewTimesheet({ weekStart: '', weekEnd: '', totalHours: '' });
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'rejected': return <Trash2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const viewDocument = (doc: TimesheetDocument) => {
    // In a real app, this would open the actual document
    // For now, we'll show document details in a modal
    alert(`Document: ${doc.name}\nType: ${doc.type}\nSize: ${doc.size}\nUploaded: ${new Date(doc.uploadDate).toLocaleDateString()}\n\nIn a production app, this would open the document for viewing.`);
  };

  const deleteDocument = (timesheetId: string, docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setTimesheets(prev => 
        prev.map(ts => 
          ts.id === timesheetId 
            ? { 
                ...ts, 
                documents: ts.documents.filter(doc => doc.id !== docId) 
              }
            : ts
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Timesheets</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Week
          </button>
        </div>

        {/* Add New Timesheet Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Weekly Timesheet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Week Start Date
                </label>
                <input
                  type="date"
                  value={newTimesheet.weekStart}
                  onChange={(e) => setNewTimesheet(prev => ({ ...prev, weekStart: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Week End Date
                </label>
                <input
                  type="date"
                  value={newTimesheet.weekEnd}
                  onChange={(e) => setNewTimesheet(prev => ({ ...prev, weekEnd: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="168"
                  value={newTimesheet.totalHours}
                  onChange={(e) => setNewTimesheet(prev => ({ ...prev, totalHours: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="40"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddTimesheet}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Timesheet
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Timesheets List */}
        <div className="space-y-6">
          {timesheets.map((timesheet) => (
            <div key={timesheet.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Week of {new Date(timesheet.weekStart).toLocaleDateString()} - {new Date(timesheet.weekEnd).toLocaleDateString()}
                  </h3>
                  <p className="text-gray-600">Total Hours: {timesheet.totalHours}</p>
                  {timesheet.submittedDate && (
                    <p className="text-sm text-gray-500">Submitted: {new Date(timesheet.submittedDate).toLocaleDateString()}</p>
                  )}
                  {timesheet.approvedDate && (
                    <p className="text-sm text-gray-500">Approved: {new Date(timesheet.approvedDate).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(timesheet.status)}`}>
                    {getStatusIcon(timesheet.status)}
                    {timesheet.status.charAt(0).toUpperCase() + timesheet.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Documents Section */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Supporting Documents ({timesheet.documents.length})</h4>
                  <label className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 cursor-pointer flex items-center gap-2 text-sm">
                    <Upload className="w-4 h-4" />
                    Upload Files
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.xlsx,.xls,.eml,.msg,.txt,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFileUpload(Array.from(e.target.files), timesheet.id);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Upload Progress */}
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}

                {/* Documents List */}
                <div className="space-y-2">
                  {timesheet.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => viewDocument(doc)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteDocument(timesheet.id, doc.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {timesheet.documents.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No documents uploaded yet</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {timesheets.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No timesheets yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first weekly timesheet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add First Timesheet
            </button>
          </div>
        )}

        {/* Guidelines */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Timesheet Guidelines
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Upload approved timesheet documents (emails, PDFs, Excel files)</li>
            <li>• Record total hours for each week (start date to end date)</li>
            <li>• Supported formats: PDF, Excel (.xlsx, .xls), Email files, Images (JPG, PNG)</li>
            <li>• Maximum file size: 10MB per file</li>
            <li>• Keep records of manager approvals and email confirmations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimesheetsPage; 