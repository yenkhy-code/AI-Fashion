
import React from 'react';
import { DownloadIcon, RefreshCwIcon } from './Icons';

interface ResultDisplayProps {
  originalImageUrl: string;
  editedImageUrl: string;
  onDownload: () => void;
  onReset: () => void;
}

const ImageCard: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="w-full aspect-square rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImageUrl, editedImageUrl, onDownload, onReset }) => {
  return (
    <div className="animate-fade-in text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">AI 화보가 완성되었습니다!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ImageCard imageUrl={originalImageUrl} title="원본 이미지" />
        <ImageCard imageUrl={editedImageUrl} title="AI 생성 화보" />
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={onDownload}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>다운로드</span>
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          <RefreshCwIcon className="w-5 h-5" />
          <span>새로 만들기</span>
        </button>
      </div>
    </div>
  );
};
