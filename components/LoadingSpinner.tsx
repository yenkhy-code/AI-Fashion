
import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons';

const loadingMessages = [
  "AI가 창의력을 발휘하고 있어요...",
  "패션 아이템을 분석하는 중...",
  "멋진 스케치를 추가하고 있어요...",
  "거의 다 완성되었어요, 잠시만 기다려주세요!",
];

export const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <SparklesIcon className="w-10 h-10 text-indigo-500 animate-pulse"/>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mt-8">AI 화보를 만들고 있어요...</h2>
      <p className="text-gray-500 mt-2 transition-opacity duration-500">{loadingMessages[messageIndex]}</p>
    </div>
  );
};
