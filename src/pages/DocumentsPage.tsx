import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface Document {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  url?: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  documents: Document[];
  maxFiles: number;
}

const DocumentsPage = () => {
  const { user } = useAuthStore();
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('passport');

  const [documentCategories, setDocumentCategories] = useState<DocumentCategory[]>([
    {
      id: 'passport',
      name: 'Passport & Visa',
      description: 'Current passport, previous visas, I-94 records',
      required: true,
      maxFiles: 5,
      documents: [
        {
          id: '1',
          name: 'passport_main_page.pdf',
          category: 'passport',
          size: '2.4 MB',
          uploadDate: '2024-11-15',
          status: 'approved'
        },
        {
          id: '2',
          name: 'current_visa.pdf',
          category: 'passport',
          size: '1.8 MB',
          uploadDate: '2024-11-15',
          status: 'processing'
        }
      ]
    },
    {
      id: 'h1b',
      name: 'Current H1B Documents',
      description: 'H1B approval notice, petition, LCA',
      required: true,
      maxFiles: 5,
      documents: [
        {
          id: '3',
          name: 'h1b_approval_notice.pdf',
          category: 'h1b',
          size: '3.2 MB',
          uploadDate: '2024-11-14',
          status: 'approved'
        }
      ]
    },
    {
      id: 'education',
      name: 'Educational Documents',
      description: 'Degrees, transcripts, credential evaluations',
      required: true,
      maxFiles: 10,
      documents: [
        {
          id: '4',
          name: 'bachelors_degree.pdf',
          category: 'education',
          size: '1.5 MB',
          uploadDate: '2024-11-13',
          status: 'approved'
        },
        {
          id: '5',
          name: 'masters_degree.pdf',
          category: 'education',
          size: '1.7 MB',
          uploadDate: '2024-11-13',
          status: 'pending'
        }
      ]
    },
    {
      id: 'employment',
      name: 'Employment Documents',
      description: 'Offer letter, experience letters, paystubs',
      required: true,
      maxFiles: 8,
      documents: [
        {
          id: '6',
          name: 'offer_letter_new_employer.pdf',
          category: 'employment',
          size: '890 KB',
          uploadDate: '2024-11-12',
          status: 'processing'
        }
      ]
    },
    {
      id: 'financial',
      name: 'Financial Documents',
      description: 'Bank statements, tax returns, financial proof',
      required: false,
      maxFiles: 6,
      documents: []
    },
    {
      id: 'other',
      name: 'Other Documents',
      description: 'Marriage certificate, birth certificate, etc.',
      required: false,
      maxFiles: 5,
      documents: []
    }
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    // Validate each file before processing
    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    for (const file of files) {
      // Check file size
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB. Your file is ${formatFileSize(file.size)}.`);
        continue;
      }
      
      // Check file type
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        alert(`File "${file.name}" is not a supported format. Please upload PDF, JPG, or PNG files only.`);
        continue;
      }
      
      validFiles.push(file);
    }
    
    if (validFiles.length === 0) {
      return; // No valid files to upload
    }
    
    // Check category upload limit
    const selectedCat = documentCategories.find(cat => cat.id === selectedCategory);
    if (selectedCat && selectedCat.documents.length + validFiles.length > selectedCat.maxFiles) {
      alert(`Cannot upload ${validFiles.length} files. This category allows maximum ${selectedCat.maxFiles} files and you already have ${selectedCat.documents.length} uploaded.`);
      return;
    }

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      // Generate truly unique upload ID with timestamp, index, and random string
      const fileId = `upload_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Add small delay between files to prevent timing conflicts
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(uploadInterval);
            // Add to documents list
            setTimeout(() => {
              const newDoc: Document = {
                id: fileId,
                name: file.name,
                category: selectedCategory,
                size: formatFileSize(file.size),
                uploadDate: new Date().toISOString().split('T')[0],
                status: 'processing'
              };
              
              setDocumentCategories(prev => 
                prev.map(cat => 
                  cat.id === selectedCategory 
                    ? { ...cat, documents: [...cat.documents, newDoc] }
                    : cat
                )
              );
              
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileId];
                return newProgress;
              });
            }, 1000);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="text-green-500">✓</span>;
      case 'rejected':
        return <span className="text-red-500">✗</span>;
      case 'processing':
        return <span className="text-blue-500">⏳</span>;
      default:
        return <span className="text-yellow-500">⏸</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const selectedCategoryData = documentCategories.find(cat => cat.id === selectedCategory);
  const totalDocuments = documentCategories.reduce((sum, cat) => sum + cat.documents.length, 0);
  const approvedDocuments = documentCategories.reduce((sum, cat) => 
    sum + cat.documents.filter(doc => doc.status === 'approved').length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Management</h1>
          <p className="text-lg text-gray-600">Upload and manage your H1B transfer documents</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedDocuments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalDocuments > 0 ? Math.round((approvedDocuments / totalDocuments) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Document Categories</h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {documentCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{category.name}</h3>
                        <div className="flex items-center space-x-2">
                          {category.required && (
                            <span className="text-red-500 text-xs font-medium">REQUIRED</span>
                          )}
                          <span className="text-sm text-gray-500">
                            {category.documents.length}/{category.maxFiles}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      <div className="mt-2 flex space-x-1">
                        {category.documents.map((doc) => (
                          <div key={doc.id} className="w-2 h-2 rounded-full bg-blue-300"></div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Upload Area */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upload to: {selectedCategoryData?.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{selectedCategoryData?.description}</p>
              </div>
              
              <div className="p-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-4xl mb-4">📁</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Supports PDF, JPG, PNG up to 10MB each
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>

                {/* Upload Progress */}
                {Object.keys(uploadProgress).length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Uploading...</h4>
                    {Object.entries(uploadProgress).map(([fileId, progress]) => (
                      <div key={fileId} className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Uploading file...</span>
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
                  </div>
                )}
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedCategoryData?.name} Documents
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {selectedCategoryData?.documents.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-4">📄</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                    <p className="text-gray-600">Upload your first document to get started</p>
                  </div>
                ) : (
                  selectedCategoryData?.documents.map((doc) => (
                    <div key={doc.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-600">📄</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-600">
                              {doc.size} • Uploaded {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {getStatusIcon(doc.status)} {doc.status}
                          </span>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-900">Document Guidelines</h3>
              <div className="mt-2 text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>All documents must be clear and legible</li>
                  <li>Upload high-quality scans (300 DPI recommended)</li>
                  <li>Ensure all text is readable and pages are complete</li>
                  <li>Required documents must be uploaded for application processing</li>
                </ul>
              </div>
              <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium">
                View Complete Guidelines →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 