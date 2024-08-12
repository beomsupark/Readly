import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import '../../components/Review/like_btn.css';
import useUserStore from '../../store/userStore.js';
import useLikeStore from '../../store/likeStore.js';

const ShowReview = ({ review, isModal = false, onLikeClick, externalLikeState }) => {
  const {
    id,
    bookImage,
    bookTitle,
    bookAuthor,
    memberId,
    reviewText,
    likeCount: initialLikeCount,
    likeCheck,
  } = review;

  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUserStore();
  const { likes, toggleLike, setInitialLikeStatus } = useLikeStore();
  
  const [isLiked, setIsLiked] = useState(() => {
    // localStorage에서 좋아요 상태를 확인
    const storedLikes = JSON.parse(localStorage.getItem('likes') || '{}');
    return storedLikes[id] !== undefined ? storedLikes[id] : likeCheck === 1;
  });
  const [currentLikeCount, setCurrentLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setInitialLikeStatus(id, isLiked);
  }, [id, isLiked, setInitialLikeStatus]);

  useEffect(() => {
    if (externalLikeState !== undefined) {
      setIsLiked(externalLikeState);
      setCurrentLikeCount(initialLikeCount);
    }
  }, [externalLikeState, initialLikeCount]);

  const handleLikeClick = async (event) => {
    event.stopPropagation();
    const newLikeStatus = await toggleLike(user.id, id, true);  // true indicates it's a review
    setIsLiked(newLikeStatus);
    setCurrentLikeCount(prev => newLikeStatus ? prev + 1 : prev - 1);
    
    // localStorage에 좋아요 상태 저장
    const storedLikes = JSON.parse(localStorage.getItem('likes') || '{}');
    storedLikes[id] = newLikeStatus;
    localStorage.setItem('likes', JSON.stringify(storedLikes));
    
    if (onLikeClick) {
      onLikeClick(id, newLikeStatus);
    }
  };

  const containerClasses = isModal
    ? "w-full bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden flex flex-col"
    : "w-full bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden flex flex-col";

  const imageClasses = isModal
    ? "w-full h-[200px] relative"
    : "w-full h-0 pb-[50%] relative";

  const contentClasses = isModal
    ? "p-6 flex flex-col flex-grow"
    : "p-2 flex flex-col flex-grow";

  const titleClasses = isModal
    ? "font-bold text-xl mb-2"
    : "font-bold text-xs line-clamp-1";

  const authorClasses = isModal
    ? "text-base text-gray-600"
    : "text-[10px] text-gray-600 line-clamp-1";

  const reviewTextClasses = isModal
    ? "text-base mb-4 max-h-[300px] overflow-y-auto font-bold"
    : "text-[10px] mb-1 flex-grow overflow-hidden line-clamp-2 font-bold";

  const isCurrentUser = user.id === memberId;
    
  return (
    <div className={containerClasses}>
      <div className={imageClasses}>
        <img
          src={bookImage}
          alt={bookTitle}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      <div className={contentClasses}>
        <div className="border-b pb-2 mb-2">
          <h3 className={titleClasses}>{bookTitle}</h3>
          <p className={authorClasses}>{bookAuthor}</p>
        </div>
        <p className={reviewTextClasses}>{reviewText}</p>
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="relative">
            {isCurrentUser ? (
              <div 
                className="flex items-center group cursor-default"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <User size={isModal ? 16 : 12} className="text-gray-600 mr-1" />
                <span className={`font-bold text-gray-600 ${isModal ? 'text-sm' : 'text-[10px]'}`}>
                  {memberId}
                </span>
                {isHovered && (
                  <span className="absolute left-0 bottom-full mb-2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-10 font-bold">
                    내가 작성한 리뷰입니다
                  </span>
                )}
              </div>
            ) : (
              <Link 
                to={`/member/${memberId}`}
                className="flex items-center group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <User size={isModal ? 16 : 12} className="text-gray-600 mr-1 transition-transform duration-100 group-hover:scale-125" />
                <span className={`font-bold text-gray-600 group-hover:text-blue-600 ${isModal ? 'text-sm' : 'text-[10px]'}`}>
                  {memberId}
                </span>
                {isHovered && (
                  <span className="absolute left-0 bottom-full mb-2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-10 font-bold">
                    작성자 페이지로 이동
                  </span>
                )}
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              className={`heart-container ${isModal ? '' : 'scale-75'}`}
              title="Like"
              onClick={handleLikeClick}
            >
              <div className="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  className={`svg-outline ${isLiked ? "hidden" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className={`svg-filled ${isLiked ? "" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
              </div>
            </button>
            <span>{currentLikeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowReview;