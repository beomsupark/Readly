import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import CurrentPageModal from './CurrentPageModal';
import useUserStore from '../../store/userStore';

export default function ProgressBar({ 
  bookId,
  currentPage, 
  totalPages, 
  onUpdateCurrentPage,
  userId
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const progressBarRef = useRef(null);
  const { token } = useUserStore();

  useEffect(() => {
    console.log('ProgressBar props:', { bookId, currentPage, totalPages, userId });
  }, [bookId, currentPage, totalPages, userId]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = async (newPage) => {
    const parsedPage = parseInt(newPage, 10);
    if (!isNaN(parsedPage)) {
      try {
        // 백엔드 요청
        const response = await axios.patch(
          'http://localhost:8080/api/user/update-page',
          {
            bookId: bookId,
            memberId: userId,
            currentPage: parsedPage
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // 백엔드 응답과 상관없이 프론트엔드 상태 업데이트
        onUpdateCurrentPage(parsedPage);
        closeModal();

        // 백엔드 응답이 'ok'가 아닐 경우 콘솔에 경고 로그 출력
        if (response.data !== 'ok') {
          console.warn('Backend response was not "ok":', response.data);
        }
      } catch (error) {
        console.error('Error updating page:', error);
        // 오류 발생 시에도 프론트엔드 상태 업데이트
        onUpdateCurrentPage(parsedPage);
        closeModal();
      }
    } else {
      console.error("Invalid page number");
    }
  };

  const percentage = currentPage && totalPages ? Math.round((currentPage / totalPages) * 100) : 0;

  const openModal = (event) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setModalIsOpen(true);
  };

  return (
    <div ref={progressBarRef}>
      <div className="w-full h-8 bg-[#F8F8F8] rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-[#E3F7FF] text-center text-black p-1"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <button 
          onClick={openModal}
          className="cursor-pointer"
        >
          p {currentPage || 0}
        </button>
        <div>
        <span className="mr-2">p {totalPages || 100}</span>
        <button>완료</button>
        </div>
      </div>

      <CurrentPageModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        onSave={handleSave}
        position={modalPosition}
      />
    </div>
  );
}