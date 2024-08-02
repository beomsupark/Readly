import Modal from "react-modal";
import LevelIcon1 from "../../assets/level/lv1.png";
import LevelIcon2 from "../../assets/level/lv2.png";
import LevelIcon3 from "../../assets/level/lv3.png";
import LevelIcon4 from "../../assets/level/lv4.png";
import InfoIcon from "../../assets/header/info_img.png";

Modal.setAppElement("#root");

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

export default function FollowList({ isOpen, onRequestClose, books }) {
  const levelIcons = {
    1: LevelIcon1,
    2: LevelIcon2,
    3: LevelIcon3,
    4: LevelIcon4,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={300}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">팔로우 하는 사람들이에요!</h2>
      <div className="flex space-x-2 mb-2 gap-4">
        {books &&
          books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-200 w-[7rem] h-[9rem] p-2 rounded-xl flex-cols items-center bg-[#F5F5F5]"
            >
              <img
                src={levelIcons[book.level]}
                alt={`Level ${book.level}`}
                className="w-8 h-8 mr-2"
              />
              <div className="ml-4">
                <img src={InfoIcon} alt="info" className="w-14 h-12" />
                <p className="font-semibold">{book.nickname}</p>
                <p className="text-sm text-gray-600">{book.intro}</p>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
}
