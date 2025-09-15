
import React from 'react';
import { AlertTriangleIcon, RefreshCwIcon } from './Icons';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
      <AlertTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-800 mb-2">오류가 발생했습니다</h3>
      <p className="text-red-600 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        <RefreshCwIcon className="w-5 h-5" />
        <span>다시 시도</span>
      </button>
    </div>
  );
};
