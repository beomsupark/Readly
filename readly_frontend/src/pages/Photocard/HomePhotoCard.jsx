import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePhotocardStore from '../../store/photocardStore';
import '../../pages/Photocard/photocard_flip.css';

export default function HomePhotocard({ onPhotoCardClick }) {
  const navigate = useNavigate();
  const { photocards, fetchHomePhotocards, currentPage, totalPages, isLoading, error } = usePhotocardStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchHomePhotocards();
  }, []);

  const handleShowMore = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentPage < totalPages) {
        fetchHomePhotocards(currentPage + 1);
      } else {
        fetchHomePhotocards(1);
      }
      setIsAnimating(false);
    }, 500);
  };

  const handleMorePhotocards = () => {
    navigate('/photocards');
  };

  const currentPhotocards = [...photocards.slice(currentIndex, currentIndex + 6)];
  while (currentPhotocards.length < 6) {
    currentPhotocards.push({ photoCardId: `dummy-${currentPhotocards.length}`, photoCardImage: null });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full ml-3 bg-gray-100">
      <div className="max-w-full mx-auto px-2 lg:px-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">사용자들이 좋아하는 <span className="text-custom-highlight">포토카드</span></h2>
          <button
            onClick={handleMorePhotocards}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-sm text-[#868686] font-bold">
              더 많은 포토카드를 보고싶으신가요?
            </span>
          </button>
        </div>
        <div className="relative overflow-hidden">
          <div
            className={`flex justify-between items-center transition-transform duration-500 ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}
            key={currentIndex}
          >
            <div className="grid grid-cols-6 gap-2 flex-grow">
              {currentPhotocards.map((photocard, index) => (
                <div 
                  key={`${currentIndex}-${index}`} 
                  className="flex-none w-24 h-36 cursor-pointer"
                  onClick={() => onPhotoCardClick(photocard)}
                >
                  {photocard.photoCardImage ? (
                    <div className="flip-container relative w-full h-full photocard rounded-lg overflow-hidden">
                      <div className="flip-card w-full h-full">
                        <div className="flip-card-front w-full h-full">
                          <img
                            src={photocard.photoCardImage}
                            alt={photocard.bookTitle || 'Photocard'}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              console.error("Image failed to load:", e.target.src);
                              e.target.src = "/path/to/fallback/image.jpg";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full photocard bg-gray-200 rounded-lg"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center ml-2">
              <button
                onClick={handleShowMore}
                className="text-blue-500 hover:text-blue-700 text-lg font-bold"
              >
                <span className="text-custom-highlight">&gt;</span> <span className="text-[1rem] text-[#868686]"> 더보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}