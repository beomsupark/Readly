import Modal from "react-modal";
import { useState } from "react";
import GoButton from "../../components/GoButton/GoButton.jsx";
import TimecapsuleSelect from "./TimecapsuleSelect.jsx";


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
    width: "22%",
    height: "22%",
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

export default function TimecapsulePeriod({ isOpen, onRequestClose, photocard, review }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPhotocards, setFilteredPhotocards] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const openModal = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredPhotocards = photocard.filter((card) => {
      const createDate = new Date(card.create);
      return createDate >= start && createDate <= end;
    });

    const filteredReviews = review.filter((review) => {
      const createDate = new Date(review.create);
      return createDate >= start && createDate <= end;
    });

    setFilteredPhotocards(filteredPhotocards);
    setFilteredReviews(filteredReviews);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
      <h2 className="text-xl font-bold mb-4">기간을 입력해주세요!</h2>
      <div className="flex gap-4">
        <input
          type="date"
          className="border rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        ~
        <input
          type="date"
          className="border rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <GoButton text="확인" onClick={openModal} />

      <TimecapsuleSelect
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        photocards={filteredPhotocards}
        reviews={filteredReviews}
      />
    </Modal>
  );
}
