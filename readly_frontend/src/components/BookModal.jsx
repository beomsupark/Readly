/* eslint-disable react/prop-types */
import Modal from 'react-modal';
// import { XIcon } from '@heroicons/react/solid';

// 앱의 루트 요소를 설정합니다
Modal.setAppElement('#root');

// 모달의 스타일을 정의합니다
const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 오버레이 배경 색상과 투명도
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '80%', // 모달 창의 너비
    maxWidth: '600px', // 모달 창의 최대 너비
    height: 'auto', // 높이는 자동으로 조정
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // 중앙에 배치
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    padding: '20px',
    overflow: 'auto',
  },
};

const BookModal = ({ isOpen, onRequestClose, book }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles} // 스타일 적용
      ariaHideApp={false} // 접근성 관련 설정 (필요 시)
      shouldCloseOnOverlayClick={true} // 모달 외부 클릭 시 닫기 설정
      closeTimeoutMS={300} // 모달 애니메이션 시간 설정 (선택 사항)
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
      >
        {/* <XIcon className="h-8 w-8" /> */}
      </button>
      {book && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
          <img src={book.cover} alt={book.title} className="w-full h-auto max-h-[80vh] object-cover" />
        </div>
      )}
    </Modal>
  );
};

export default BookModal;
