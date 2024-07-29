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

export default function BookshelfList({ isOpen, onRequestClose, books }) {
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
      <h2 className="text-2xl font-bold mb-4">읽은 책들이에요!</h2>
      <div className="flex-col gap-4">
        {books &&
          books.map((book) => (
            <div key={book.id} className="flex items-center">
              <img
                src={book.cover}
                alt={book.title}
                className="w-[10rem] h-auto object-cover mb-2"
              />
              <div>
                <p className="text-center">{book.title}</p>
                <p className="text-center">{book.description}</p>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
}
