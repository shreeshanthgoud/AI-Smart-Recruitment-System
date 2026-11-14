import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import API from '../services/api';

const UploadResume = ({ onUpload, onClose }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await API.post('/upload-resume', formData);
      onUpload?.(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-slideUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Upload Resume</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
            }`}
          >
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-lg font-medium text-gray-900">Drop your resume here</p>
            <p className="text-sm text-gray-600 mt-2">or click to browse</p>
            <p className="text-xs text-gray-500 mt-4">PDF only</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e.target.files?.[0])}
              className="hidden"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
