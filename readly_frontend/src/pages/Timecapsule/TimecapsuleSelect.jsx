import { useState } from "react";
import Modal from "react-modal";
import GoButton from "../../components/GoButton/GoButton.jsx";
import TimecapsuleOpen from "./TimecapsuleOpen.jsx";
import { createTimeCapsule } from '../../api/timecapsuleAPI.js'; // API 함수 import

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
  photoCards,
  reviews,
  userId,
  startDate,
  endDate
}) {
  const [selectedPhotoCards, setSelectedPhotoCards] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleSelection = (id, type) => {
    if (type === "photoCard") {
      setSelectedPhotoCards((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else if (type === "review") {
      setSelectedReviews((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const openModal = async () => {
    try {
      const success = await createTimeCapsule(
        userId,
        startDate,
        endDate,
        selectedReviews,
        selectedPhotoCards
      );
      if (success) {
        setModalIsOpen(true);
      } else {
        alert("타임캡슐 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error creating time capsule:", error);
      alert("타임캡슐 생성 중 오류가 발생했습니다.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const selectedPhotoCardsData = selectedPhotoCards.map((id) =>
    photoCards.find((card) => card.photoCardId === id)
  );

  const selectedReviewsData = selectedReviews.map((id) =>
    reviews.find((review) => review.reviewId === id)
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
            {photoCards &&
              photoCards.map((card) => (
                <div
                  key={card.photoCardId}
                  className="flex items-center"
                  onDoubleClick={() => toggleSelection(card.photoCardId, "photoCard")}
                >
                  <img
                    src={card.photoCardImage}
                    alt={card.bookTitle}
                    className={`h-[7rem] rounded ${
                      selectedPhotoCards.includes(card.photoCardId)
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
              reviews.map((review) => (
                <div
                  key={review.reviewId}
                  className="flex items-center"
                  onDoubleClick={() => toggleSelection(review.reviewId, "review")}
                >
                  <img
                    src={review.bookImage}
                    alt={review.bookTitle}
                    className={`h-[7rem] rounded ${
                      selectedReviews.includes(review.reviewId)
                        ? "border-2 border-[red]"
                        : ""
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>

        <GoButton text="타임캡슐 생성" onClick={openModal} />
      </Modal>

      <TimecapsuleOpen
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedPhotoCards={selectedPhotoCardsData}
        selectedReviews={selectedReviewsData}
      />
    </>
  );
}