import { useState, useEffect } from "react";
import Modal from "react-modal";
import { openTimeCapsule } from '../../api/timecapsuleAPI'; // API 함수 import

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

export default function TimecapsuleOpen({
  isOpen,
  onRequestClose,
  timecapsuleId
}) {
  const [timecapsuleContent, setTimecapsuleContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && timecapsuleId) {
      setLoading(true);
      openTimeCapsule(timecapsuleId)
        .then(data => {
          setTimecapsuleContent(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error opening time capsule:", err);
          setError("타임캡슐을 열 수 없습니다. 다시 시도해주세요.");
          setLoading(false);
        });
    }
  }, [isOpen, timecapsuleId]);

  if (!isOpen) return null;

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
      <h2 className="text-2xl font-bold mb-4">타임캡슐 내용</h2>
      
      {loading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {timecapsuleContent && (
        <div className="flex-col gap-4">
          <h3 className="font-bold mb-2">포토카드</h3>
          <div className="flex flex-wrap gap-2">
            {timecapsuleContent.photoCards.map((photocard) => (
              <div key={photocard.photoCardId} className="flex items-center">
                <img
                  src={photocard.photoCardImage}
                  alt={photocard.bookTitle}
                  className="h-[7rem] rounded"
                />
                <p className="ml-2">{photocard.bookTitle}</p>
              </div>
            ))}
          </div>

          <h3 className="font-bold mb-2 mt-4">리뷰</h3>
          <div className="flex flex-wrap gap-2">
            {timecapsuleContent.reviews.map((review) => (
              <div key={review.reviewId} className="flex items-center">
                <img
                  src={review.bookImage}
                  alt={review.bookTitle}
                  className="h-[7rem] rounded"
                />
                <div className="ml-2">
                  <p className="font-semibold">{review.bookTitle}</p>
                  <p>{review.reviewText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}