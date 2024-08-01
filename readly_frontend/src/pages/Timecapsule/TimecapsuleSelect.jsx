import { useState } from "react";
import Modal from "react-modal";
import GoButton from "../../components/GoButton/GoButton.jsx";
import TimecapsuleOpen from "./TimecapsuleOpen.jsx";

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

export default function TimecapsuleSelect({
  isOpen,
  onRequestClose,
  photocards,
  reviews,
}) {
  const [selectedPhotocards, setSelectedPhotocards] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleSelection = (id, type) => {
    if (type === "photocard") {
      setSelectedPhotocards((prev) => {
        const newSelection = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
        return newSelection;
      });
    } else if (type === "review") {
      setSelectedReviews((prev) => {
        const newSelection = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
        return newSelection;
      });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const selectedPhotocardsData = selectedPhotocards.map((id) =>
    photocards.find((card) => card.id === id)
  );

  const selectedReviewsData = selectedReviews.map((id) =>
    reviews.find((review) => review.id === id)
  );

  return (
    <>
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
        <h2 className="text-2xl font-bold mb-4">어떤 걸 타임캡슐에 넣어드릴까요?</h2>
        <div className="flex-col gap-4">
          <h3 className="font-bold mb-2">내가 만든 포토카드</h3>
          <div className="flex flex-wrap gap-2">
            {photocards &&
              photocards.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center"
                  onDoubleClick={() => toggleSelection(book.id, "photocard")}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className={`h-[7rem] rounded ${
                      selectedPhotocards.includes(book.id)
                        ? "border-2 border-[red]"
                        : ""
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex-col gap-4 mt-4">
          <h3 className="font-bold mb-2">내가 남긴 한줄평</h3>
          <div className="flex flex-wrap gap-2">
            {reviews &&
              reviews.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center"
                  onDoubleClick={() => toggleSelection(book.id, "review")}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className={`h-[7rem] rounded ${
                      selectedReviews.includes(book.id)
                        ? "border-2 border-[red]"
                        : ""
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>

        <GoButton text="선택" onClick={openModal} />
      </Modal>

      <TimecapsuleOpen
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedPhotocards={selectedPhotocardsData}
        selectedReviews={selectedReviewsData}
      />
    </>
  );
}
