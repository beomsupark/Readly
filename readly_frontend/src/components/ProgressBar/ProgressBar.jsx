import { useState, useRef, useEffect } from "react";
import CurrentPageModal from "./CurrentPageModal";

export default function ProgressBar({
  currentPage,
  totalPages,
  onUpdateCurrentPage,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const progressBarRef = useRef(null);

  useEffect(() => {
    console.log("ProgressBar props:", { currentPage, totalPages });
  }, [currentPage, totalPages]);

  const openModal = () => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
  
      // 모달의 위치를 조정하는 부분
      let top = rect.top;
      let left = rect.left;
  
      // 아래로 내려가는 정도를 조정하려면 top 값을 조정합니다.
      top += 10; // 20픽셀 아래로 추가 이동 (원하는 만큼 조정 가능)
  
  
      setModalPosition({
        top: top,
        left: left,
      });
    }
    setModalIsOpen(true);
  };
  

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = (newPage) => {
    const parsedPage = parseInt(newPage, 10);
    if (!isNaN(parsedPage)) {
      onUpdateCurrentPage(parsedPage);
      closeModal();
    } else {
      console.error("Invalid page number");
    }
  };

  const percentage = Math.round((currentPage / totalPages) * 100);

  return (
    <div ref={progressBarRef}>
      <div className="w-full h-8 bg-[#F8F8F8] rounded-full mt-3 overflow-hidden">
        <div
          className="h-full bg-[#E3F7FF] text-center text-black p-1"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <button onClick={openModal} className="cursor-pointer">
          p {currentPage || 0}
        </button>
        <span>p {totalPages || 100}</span>
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
