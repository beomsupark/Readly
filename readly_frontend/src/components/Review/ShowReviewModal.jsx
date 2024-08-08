import { useEffect } from 'react';
import ShowReview from './ShowReview';

const ShowReviewModal = ({ review, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-[90%] max-w-[600px] max-h-[80%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ShowReview review={review} isModal={true} />
      </div>
    </div>
  );
};

export default ShowReviewModal;