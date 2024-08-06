import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    padding: '20px',
    borderRadius: '10px',
  },
};

Modal.setAppElement('#root'); // 또는 your app element

function GroupCreateReview({ isOpen, onRequestClose, book, onReviewSubmit, groupName }) {
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setReviewText('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onReviewSubmit(reviewText);
    setReviewText('');
    onRequestClose();
  };

  if (!book) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Create Group Review Modal"
    >
      <h2 className="text-2xl font-bold mb-4">{groupName} 그룹의 리뷰 작성</h2>
      <h3 className="text-xl font-semibold mb-2">{book.book_title}</h3>
      <div className="mb-4">
        <img src={book.book_image} alt={book.book_title} className="w-32 h-auto mb-2" />
        <p className="text-sm text-gray-600">저자: {book.book_author}</p>
      </div>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full h-32 p-2 border rounded mb-4"
        placeholder="그룹의 리뷰를 입력해주세요..."
      />
      <div className="flex justify-end">
        <button
          onClick={onRequestClose}
          className="mr-2 px-4 py-2 bg-gray-200 rounded"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!reviewText.trim()}
        >
          리뷰 제출
        </button>
      </div>
    </Modal>
  );
}

GroupCreateReview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  book: PropTypes.shape({
    book_title: PropTypes.string,
    book_author: PropTypes.string,
    book_image: PropTypes.string,
  }),
  onReviewSubmit: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default GroupCreateReview;