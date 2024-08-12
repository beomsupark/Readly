import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../components/Review/like_btn.css';
import { User } from 'lucide-react';
import useUserStore from '../../store/userStore.js';
import useLikeStore from '../../store/likeStore.js';

const PhotocardBack = ({ photoCardText, memberId, bookTitle, bookAuthor, likeCount: initialLikeCount, likeCheck: initialLikeCheck, onLikeClick, photoCardCreatedDate, photoCardId }) => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUserStore();
  const { likes, toggleLike, setInitialLikeStatus } = useLikeStore();
  
  // 기존에 저장된 좋아요 상태를 로컬 스토리지에서 불러오기
  const isLiked = likes[photoCardId] !== undefined ? likes[photoCardId] : initialLikeCheck === 1;
  const currentLikeCount = isLiked ? initialLikeCount + 1 : initialLikeCount;

  useEffect(() => {
    // 컴포넌트가 로드될 때 로컬 스토리지에 저장된 상태로 설정
    setInitialLikeStatus(photoCardId, isLiked);
  }, [photoCardId, isLiked, setInitialLikeStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Canvas 크기 설정 (모달 크기에 맞춤)
    canvas.width = 360;
    canvas.height = 500;

    // 배경 설정
    ctx.fillStyle = "#F8F8F8";
    ctx.fillRect(0, 0, 360, 500);

    // 텍스트 색상 설정
    ctx.fillStyle = "black";

    // 날짜 추가 (우상단)
    ctx.font = 'bold 14px sans-serif';
    const date = new Date(photoCardCreatedDate).toISOString().split('T')[0];
    ctx.textAlign = 'right';
    ctx.fillText(date, 340, 30);

    // 날짜 아래 구분선 추가
    ctx.beginPath();
    ctx.moveTo(20, 45);
    ctx.lineTo(340, 45);
    ctx.stroke();

    // 제목 추가 (길이에 따라 폰트 크기 조절)
    let titleFontSize = 18;
    if (bookTitle.length > 20) {
      titleFontSize = 16;
    }
    if (bookTitle.length > 30) {
      titleFontSize = 14;
    }
    ctx.font = `bold ${titleFontSize}px sans-serif`;
    ctx.textAlign = 'left';
    const titleLines = wrapText(ctx, bookTitle, 320);
    titleLines.forEach((line, index) => {
      ctx.fillText(line, 20, 80 + index * (titleFontSize + 5));
    });

    // 첫 번째 구분선 추가
    const titleHeight = titleLines.length * (titleFontSize + 5);
    ctx.beginPath();
    ctx.moveTo(20, 90 + titleHeight);
    ctx.lineTo(340, 90 + titleHeight);
    ctx.stroke();

    // 작가 추가 (길이에 따라 폰트 크기 조절 및 줄바꿈)
    let authorFontSize = 16;
    if (bookAuthor.length > 20) {
      authorFontSize = 14;
    }
    if (bookAuthor.length > 30) {
      authorFontSize = 12;
    }
    ctx.font = `bold ${authorFontSize}px sans-serif`;
    const authorLines = wrapText(ctx, bookAuthor, 320);
    authorLines.forEach((line, index) => {
      ctx.fillText(line, 20, 120 + titleHeight + index * (authorFontSize + 5));
    });

    // 두 번째 구분선 추가
    const authorHeight = authorLines.length * (authorFontSize + 5);
    ctx.beginPath();
    ctx.moveTo(20, 135 + titleHeight + authorHeight);
    ctx.lineTo(340, 135 + titleHeight + authorHeight);
    ctx.stroke();

    // 글귀 추가 (좌표 조정)
    ctx.font = '16px sans-serif';
    const quoteLines = wrapText(ctx, photoCardText, 320, 7);
    ctx.textAlign = 'left';
    quoteLines.forEach((line, index) => {
      ctx.fillText(line, 20, 190 + titleHeight + authorHeight + index * 25);
    });

    // 저작권 정보 추가
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Copyright © READLY All rights reserved", 180, 490);

  }, [photoCardText, memberId, bookTitle, bookAuthor, photoCardCreatedDate]);

  // 텍스트 줄바꿈 함수
  function wrapText(context, text, maxWidth, maxLines = Infinity) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
      if (lines.length === maxLines - 1) {
        break;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  const handleLikeClick = async (event) => {
    event.stopPropagation();
    await toggleLike(user.id, photoCardId);
    if (onLikeClick) {
      onLikeClick(event);
    }
  };

  const isCurrentUser = user.id === memberId;

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      {isCurrentUser ? (
  <div 
    className="absolute bottom-9 left-5 flex items-center group cursor-default"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <User size={16} className="text-gray-600 mr-1" />
    <span className="text-sm font-bold text-gray-600">
      작성자: {memberId}
    </span>
    {isHovered && (
      <span className="absolute left-full ml-2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-10 font-bold">
        내가 작성한 포토카드입니다
      </span>
    )}
  </div>
) : (
  <Link 
    to={`/member/${memberId}`}
    className="absolute bottom-9 left-5 flex items-center group cursor-pointer"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <User size={16} className="text-gray-600 mr-1 transition-transform duration-100 group-hover:scale-125" />
    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600">
      작성자: {memberId}
    </span>
    {isHovered && (
      <span className="absolute left-full ml-2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-10 font-bold">
        작성자 페이지로 이동
      </span>
    )}
  </Link>
)}


      <div className="absolute bottom-8 right-2 flex items-center">
        <span className="text-xs font-semibold mr-2">{currentLikeCount}</span>
        <button 
          className="heart-container" 
          title="Like"
          onClick={handleLikeClick}
        >
          <div className="svg-container">
            <svg viewBox="0 0 24 24" className={`svg-outline ${isLiked ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
              </path>
            </svg>
            <svg viewBox="0 0 24 24" className={`svg-filled ${isLiked ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
              </path>
            </svg>
            <svg className={`svg-celebrate ${isLiked ? '' : 'hidden'}`} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PhotocardBack;
