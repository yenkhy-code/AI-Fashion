
import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateFashionMoodboard } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originalImage) {
      setOriginalImageUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(originalImage);
    setOriginalImageUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [originalImage]);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setEditedImageUrl(null);
    setError(null);
  };

  const handleCreateMagazine = useCallback(async () => {
    if (!originalImage) {
      setError('먼저 이미지를 업로드해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const generatedImageBase64 = await generateFashionMoodboard(originalImage);
      setEditedImageUrl(`data:image/png;base64,${generatedImageBase64}`);
    } catch (err) {
      console.error(err);
      setError('이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setEditedImageUrl(null);
    setIsLoading(false);
    setError(null);
  };
  
  const handleDownload = () => {
    if(!editedImageUrl) return;
    const link = document.createElement('a');
    link.href = editedImageUrl;
    link.download = 'ai_fashion_moodboard.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200">
          {!originalImage && <ImageUploader onImageUpload={handleImageUpload} />}
          
          {originalImageUrl && !editedImageUrl && !isLoading && (
            <div className="text-center transition-all duration-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">업로드된 이미지</h2>
              <div className="mb-6 flex justify-center">
                <img src={originalImageUrl} alt="업로드된 인물 사진" className="max-h-96 rounded-lg shadow-md" />
              </div>
              <button
                onClick={handleCreateMagazine}
                disabled={isLoading}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                화보 만들기
              </button>
            </div>
          )}

          {isLoading && <LoadingSpinner />}
          
          {error && <ErrorDisplay message={error} onRetry={handleCreateMagazine} />}

          {editedImageUrl && !isLoading && (
            <ResultDisplay 
              originalImageUrl={originalImageUrl!}
              editedImageUrl={editedImageUrl}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
