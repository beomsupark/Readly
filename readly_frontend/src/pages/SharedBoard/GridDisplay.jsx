import { useState } from "react";
import "../../pages/Photocard/photocard_flip.css";
import ShowCardModal from "../Photocard/ShowCardModal.jsx";
import ShowReview from "../../components/Review/ShowReview.jsx";
import ShowReviewModal from "../../components/Review/ShowReviewModal.jsx";

const GridDisplay = ({ items, type }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const gridCols = type === "photocard" 
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  const itemSize = type === "review" ? "w-full h-48" : "w-24 h-40"; // 크기 조정
  const gap = "gap-12"; // 간격 조정

  const renderItem = (item) => {
    if (type === "photocard") {
      return (
        <div
          className="w-full h-full rounded-lg overflow-hidden cursor-pointer shadow-lg"
          onClick={() => handleItemClick(item)}
        >
          <img
            src={item.photoCardImage}
            alt={item.bookTitle}
            className="w-full h-full object-fill"
          />
        </div>
      );
    } else if (type === "review") {
      return (
        <div onClick={() => handleItemClick(item)} className="cursor-pointer h-full">
          <ShowReview review={item} isModal={false} />
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`grid ${gridCols} ${gap}`}>
        {items.map((item) => (
          <div
            key={type === "photocard" ? item.photoCardId : item.reviewId}
            className={`${itemSize}`}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
      {type === "photocard" ? (
        <ShowCardModal 
          item={selectedItem} 
          isOpen={!!selectedItem} 
          onClose={handleCloseModal}
        />
      ) : (
        <ShowReviewModal
          review={selectedItem}
          isOpen={!!selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GridDisplay;