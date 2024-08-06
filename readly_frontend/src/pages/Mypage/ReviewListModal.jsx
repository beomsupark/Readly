import Modal from "react-modal";
import { useEffect } from "react";
import Review from '../../components/Review/Review';  // Make sure to adjust the import path as needed

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

export default function ReviewList({ isOpen, onRequestClose, reviews }) {
  useEffect(() => {
    console.log("ReviewList received reviews:", reviews); // Log received reviews
  }, [reviews]);

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
      <h2 className="text-2xl font-bold mb-4">만든 한줄평입니다!</h2>
      <div className="flex gap-3 w-[28rem]">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              key={review.reviewId}
              bookImage={review.bookImage}
              title={review.bookTitle}
              author={review.bookAuthor}
              review={review.reviewText}
              likeCount={review.likeCount} // Make sure this exists in your review data
            />
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </Modal>
  );
}
