import { useState } from "react";
import Modal from "react-modal";
import Review from "../../components/Review/Review.jsx";
import CustomRadioButton from "../../components/RadioButton/CustomRadioButton.jsx";
import GoButton from "../../components/GoButton/GoButton.jsx";

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

export default function CreateReview({
  isOpen,
  onRequestClose,
  book,
  reviewText,
  onReviewSubmit,
}) {
  const [visibility, setVisibility] = useState("공개");

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

      <h2 className="text-2xl font-bold mb-4">{book.title} 한줄평</h2>
      <div className="p-4 rounded-lg mb-4 w-2/5 h-[20rem]">
        <Review
          bookImage={book.cover}
          title={book.title}
          author="Author Name" // Replace with actual author if available
          review={reviewText}
          likeCount={0} // Initial like count
        />
      </div>
      <div className="mt-5 ml-3 justify-start sm:w-40 lg:w-48">
        <CustomRadioButton
          options={["공개", "비공개"]}
          selectedOption={visibility}
          onChange={setVisibility}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <GoButton text="생성" />
        <GoButton text="취소" />
      </div>
    </Modal>
  );
}
