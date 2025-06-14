import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Upload, File, CheckCircle, AlertCircle, X, Download, ArrowLeft } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  file?: File;
  uploadDate?: string;
  size?: string;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'H-1B Approval Notice (I-797)', required: true, uploaded: true, uploadDate: '2025-03-01', size: '2.4 MB' },
    { id: '2', name: 'Copy of Passport (all pages with U.S. visas)', required: true, uploaded: true, uploadDate: '2025-03-01', size: '1.8 MB' },
    { id: '3', name: 'Current Resume', required: true, uploaded: false },
    { id: '4', name: 'End Client Letter/Offer Letter', required: true, uploaded: false },
    { id: '5', name: 'Previous 2 Pay Stubs', required: true, uploaded: false },
    { id: '6', name: 'Driver\'s License', required: false, uploaded: false },
  ]);

  const [dragOver, setDragOver] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleDragOver = useCallback((e: React.DragEvent, docId: string) => {
    e.preventDefault();
    setDragOver(docId);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  }, []);

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

    if (file.size > maxSize) {
      return 'File too large. Max 10MB allowed.';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Unsupported file type. Please use PDF, JPG, or PNG.';
    }

    return null;
  };

  const handleFileUpload = async (file: File, docId: string) => {
    const error = validateFile(file);
    if (error) {
      setErrors({ ...errors, [docId]: error });
      return;
    }

    setUploading(docId);
    setErrors({ ...errors, [docId]: '' });

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setDocuments(docs => docs.map(doc => 
      doc.id === docId 
        ? { 
            ...doc, 
            uploaded: true, 
            file, 
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
          }
        : doc
    ));

    setUploading(null);
  };

  const handleDrop = useCallback((e: React.DragEvent, docId: string) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], docId);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files[0], docId);
    }
  };

  const removeDocument = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId 
        ? { ...doc, uploaded: false, file: undefined, uploadDate: undefined, size: undefined }
        : doc
    ));
    setErrors({ ...errors, [docId]: '' });
  };

  const requiredDocs = documents.filter(doc => doc.required);
  const optionalDocs = documents.filter(doc => !doc.required);
  const uploadedRequired = requiredDocs.filter(doc => doc.uploaded).length;
  const totalRequired = requiredDocs.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home Navigation */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Document Upload</h1>
          <p className="text-gray-600 mt-2">
            Upload your required documents to continue with your H-1B transfer process.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upload Progress</h2>
            <span className="text-sm text-gray-600">
              {uploadedRequired} of {totalRequired} required documents uploaded
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(uploadedRequired / totalRequired) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Upload Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Drag & drop files here, or click to browse</li>
            <li>• Accepted formats: PDF, JPG, PNG. Max size 10MB</li>
            <li>• All files are securely encrypted</li>
          </ul>
        </div>

        {/* Required Documents */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h2>
          <div className="space-y-4">
            {requiredDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                dragOver={dragOver === doc.id}
                uploading={uploading === doc.id}
                error={errors[doc.id]}
                onDragOver={(e) => handleDragOver(e, doc.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, doc.id)}
                onFileSelect={(e) => handleFileSelect(e, doc.id)}
                onRemove={() => removeDocument(doc.id)}
              />
            ))}
          </div>
        </div>

        {/* Optional Documents */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Optional Documents</h2>
          <div className="space-y-4">
            {optionalDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                dragOver={dragOver === doc.id}
                uploading={uploading === doc.id}
                error={errors[doc.id]}
                onDragOver={(e) => handleDragOver(e, doc.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, doc.id)}
                onFileSelect={(e) => handleFileSelect(e, doc.id)}
                onRemove={() => removeDocument(doc.id)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Save as Draft
          </button>
          <button 
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              uploadedRequired === totalRequired
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={uploadedRequired !== totalRequired}
          >
            Continue to Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

interface DocumentCardProps {
  document: Document;
  dragOver: boolean;
  uploading: boolean;
  error?: string;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  dragOver,
  uploading,
  error,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onRemove
}) => {
  return (
    <div className={`bg-white rounded-lg shadow border-2 border-dashed transition-all ${
      dragOver ? 'border-blue-400 bg-blue-50' : 
      document.uploaded ? 'border-green-300' : 'border-gray-300'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${
              document.uploaded ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {document.uploaded ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <File className="h-6 w-6 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{document.name}</h3>
              {document.required && (
                <span className="text-sm text-red-600">Required</span>
              )}
              {document.uploaded && (
                <div className="text-sm text-gray-500 mt-1">
                  Uploaded on {document.uploadDate} • {document.size}
                </div>
              )}
            </div>
          </div>
          {document.uploaded && (
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <Download className="h-4 w-4" />
              </button>
              <button 
                onClick={onRemove}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {!document.uploaded && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag & drop your file here, or{' '}
                  <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    click to browse
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={onFileSelect}
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload; 