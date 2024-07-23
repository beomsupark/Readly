import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './photocard_flip.css'; 

export default function PhotocardSection({ photocards }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Array(photocards.length).fill(false));

  const handleShowMore = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const newIndex = (currentIndex + 6) % photocards.length;
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const handleMorePhotocards = () => {
    navigate('/photocards');
  };

  const handleFlip = (index) => {
    const updatedFlippedCards = [...flippedCards];
    updatedFlippedCards[index] = !updatedFlippedCards[index];
    setFlippedCards(updatedFlippedCards);
  };

  // 현재 표시할 포토카드 배열 생성
  const currentPhotocards = [...photocards.slice(currentIndex, currentIndex + 6)];
  // 6개가 되지 않으면 더미 이미지로 채우기
  while (currentPhotocards.length < 6) {
    currentPhotocards.push({ id: `dummy-${currentPhotocards.length}`, cover: null });
  }

  return (
    <div className="w-full ml-3 bg-gray-100">
      <div className="max-w-full mx-auto px-2 lg:px-2">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">사용자들이 좋아하는 <span className="text-custom-highlight">포토카드</span></h2>
          <button 
            onClick={handleMorePhotocards}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-sm text-[#868686] font-bold p-4">더 많은 포토카드를 보고싶으신가요?</span>
          </button>
        </div>
        <div className="relative overflow-hidden">
          <div 
            className={`flex justify-between items-center transition-transform duration-500 ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}
            key={currentIndex}
          >
            <div className="grid grid-cols-6 gap-2 flex-grow">
              {currentPhotocards.map((photocard, index) => (
                <div key={`${currentIndex}-${index}`} className="flex-none">
                  {photocard.cover ? (
                    <div 
                      className="flip-container relative w-full photocard object-cover rounded-lg"
                      onClick={() => handleFlip(currentIndex + index)}
                    >
                      <div className={`flip-card ${flippedCards[currentIndex + index] ? 'flipped' : ''}`}>
                        <div className="flip-card-front">
                          <img 
                            src={photocard.cover} 
                            alt={photocard.title} 
                            className="absolute inset-0 w-full h-full rounded-lg"
                          />
                        </div>
                        <div className="flip-card-back">
                          <img 
                            src={photocard.back} 
                            alt={photocard.title} 
                            className="absolute inset-0 w-full h-full rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full photocard bg-gray-200 rounded-lg"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center ml-2 mr-16">
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
