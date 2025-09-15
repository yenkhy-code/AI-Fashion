
import React, { useCallback, useState, useRef } from 'react';
import { UploadCloudIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert('이미지 파일만 업로드할 수 있습니다.');
      }
    }
  };

  const handleDrag = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setIsDragging(true);
    } else if (event.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
       const file = event.dataTransfer.files[0];
       if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert('이미지 파일만 업로드할 수 있습니다.');
      }
    }
  }, [onImageUpload]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">AI 패션 화보 만들기</h2>
      <p className="text-gray-600 mb-8">인물 사진을 업로드하면 AI가 멋진 패션 화보로 만들어 드립니다.</p>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      
      <label
        htmlFor="file-upload"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloudIcon className="w-10 h-10 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold text-indigo-600">클릭하여 업로드</span> 또는 드래그 앤 드롭
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP 등</p>
        </div>
      </label>
    </div>
  );
};
