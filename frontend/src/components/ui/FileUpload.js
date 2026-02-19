import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const FileUpload = ({ files, setFiles, maxFiles = 4 }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        data-testid="file-upload-dropzone"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragging
            ? "border-secondary bg-secondary/5"
            : "border-slate-300 hover:border-secondary hover:bg-slate-50"
        )}
      >
        <Upload className="w-10 h-10 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-700 font-medium mb-1">
          Drag & drop your files here, or click to browse
        </p>
        <p className="text-sm text-slate-500">
          Maximum {maxFiles} files ({files.length}/{maxFiles} selected)
        </p>
        <input
          ref={fileInputRef}
          data-testid="file-upload-input"
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              data-testid={`file-item-${index}`}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                data-testid={`remove-file-${index}`}
                onClick={() => removeFile(index)}
                className="ml-4 p-1 hover:bg-slate-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;