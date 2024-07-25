import { useState, useRef, useEffect } from 'react';
import CurrentPageModal from './CurrentPageModal.jsx'

export default function ProgressBar({ currentPage, totalPages }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const progressBarRef = useRef(null);

  const openModal = () => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const percentage = Math.round((currentPage / totalPages) * 100);

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
        <button onClick={openModal}>p {currentPage}</button>
        <span>p {totalPages}</span>
      </div>

      <CurrentPageModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        position={modalPosition}
      />
    </div>
  );
};