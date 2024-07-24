import Modal from "react-modal";

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
    width: "20%",
    height: "18%",
    maxHeight: "80vh",
    zIndex: "150",
    position: "absolute",
    bottom: "80px",
    right: "60px",
    left: "auto",
    top: "auto",
    transform: "none",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#E5E5E5",
    padding: "20px",
    overflow: "auto",
  },
};

export default function BookshelfList({ isOpen, onRequestClose }) {
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
      <h2 className="text-xl font-bold mb-4">기간을 입력해주세요!</h2>
      <div className="flex gap-4">
        <input type="date" className="border rounded" />
        ~
        <input type="date" className="border rounded" />
      </div>
    </Modal>
  );
}