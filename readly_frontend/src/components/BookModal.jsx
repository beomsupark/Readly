import Modal from 'react-modal';
import GoButton from '../components/GoButton/GoButton.jsx'
import tempImg from '../assets/onboard/card1_front.png'
import aladinLogo from '../assets/onboard/aladinLogo.png'

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "60%",
    maxWidth: "100%",
    height: "80%",
    maxHeight: "80vh",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#F5F5F5",
    padding: "20px",
    overflow: "auto",
  },
};

export default function BookModal({ isOpen, onRequestClose, book }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={300}
    >
      <div className="flex-col">
        <div className="flex-col">
          <div className="flex flex-col md:flex-row">
            <div className="w-1/5">
              <img
                src={book?.cover}
                alt={book?.title}
                className="w-40 h-auto object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold mb-2">{book?.title}</h2>
              <p className="text-gray-600 mb-4">작가{book?.author}</p>
              <p className="text-sm mb-4">책 설명{book?.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {book?.tags && book.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                    {tag}
                  </span>
                ))}
              </div>

            </div>

          </div>
          <div className="w-full mb-4 mt-2 pr-10 pl-4">
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-2">가장 <span className="text-custom-highlight">인기</span> 많은 <span className="text-custom-highlight">콘텐츠</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                <img src={tempImg} alt="책 표지" className="w-44 h-56 object-cover mb-2 rounded-[2rem]" />
                <button className="text-[#848484] px-4 py-2 rounded-full text-sm font-bold">
                  포토카드 더 보러가기
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                <img src={tempImg} alt="책 표지" className="w-44 h-56 object-cover mb-2 rounded-[2rem]" />
                <button className="text-[#848484] px-4 py-2 rounded-full text-sm font-bold">
                  한줄평 더 보러가기
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col h-full justify-end items-end">
                <h2 className="font-bold text-xl mb-4"><span className="text-custom-highlight">구매</span>를 원하시나요?</h2>
                <a href="https://www.aladin.co.kr" target="_blank" rel="noopener noreferrer" className="inline-block h-12 rounded-full overflow-hidden hover:opacity-80 transition-opacity duration-200">
                  <img src={aladinLogo} alt="알라딘으로 이동" className="h-full w-auto object-contain" />
                </a>
                <div className="flex-grow"></div>
                <div className="w-full flex justify-end">
                  <GoButton text="책 등록하기" className="mt-auto">
                  </GoButton>
                </div>
              </div>
            </div>
          </div>

        </div>
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
    </Modal>
  );
}

{/* <div className="justify-between items-center">
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  
</button>
<div className="flex items-center">
  <img src="/path-to-yes24-logo.png" alt="Yes24" className="h-6 mr-2" />
  <img src="/path-to-kyobo-logo.png" alt="교보문고" className="h-6" />
</div>
</div> */}