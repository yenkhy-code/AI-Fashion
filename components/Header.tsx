
import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <CameraIcon className="w-8 h-8 text-indigo-600 mr-3"/>
        <h1 className="text-xl font-bold text-gray-800">AI 패션 화보 만들기</h1>
      </div>
    </header>
  );
};
