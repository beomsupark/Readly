import { useState } from 'react';
import '../../pages/Photocard/photocard_flip.css';

const GridDisplay = ({ items, type }) => {
  const [flippedItems, setFlippedItems] = useState(new Array(items.length).fill(false));

  const handleFlip = (index) => {
    const updatedFlippedItems = [...flippedItems];
    updatedFlippedItems[index] = !updatedFlippedItems[index];
    setFlippedItems(updatedFlippedItems);
  };

  const gridCols = type === 'review' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3 lg:grid-cols-6';
  const itemSize = type === 'review' ? 'w-60 h-80' : 'w-40 h-60';
  const itemsPerRow = type === 'review' ? 4 : 6;

  const rows = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }

  const lastRow = rows[rows.length - 1];
  if (lastRow && lastRow.length < itemsPerRow) {
    for (let i = lastRow.length; i < itemsPerRow; i++) {
      lastRow.push({ id: `empty-${i}`, isEmpty: true });
    }
  }

  const renderItem = (item, index) => {
    if (item.isEmpty) {
      return <div className={`${itemSize} bg-gray-200 rounded-lg`}></div>;
    }

    if (type === 'photocard') {
      return (
        <div
          className="flip-container w-full h-full rounded-lg overflow-hidden cursor-pointer shadow-lg"
          onClick={() => handleFlip(index)}
        >
          <div className={`flip-card ${flippedItems[index] ? 'flipped' : ''}`}>
            <div className="flip-card-front img-container">
              <img src={item.photoCardImage} alt={item.bookTitle} />
            </div>
            <div className="flip-card-back img-container">
              <img src={item.photoCardImage} alt={item.bookTitle} />
              <div className="p-2">
                <h3 className="font-bold text-sm">{item.bookTitle}</h3>
                <p className="text-xs">{item.bookAuthor}</p>
                <p className="text-xs mt-2">{item.photoCardText}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (type === 'review') {
      return (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
          <img src={item.bookImage} alt={item.bookTitle} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-sm mb-1">{item.bookTitle}</h3>
            <p className="text-xs text-gray-600 mb-2">{item.bookAuthor}</p>
            <p className="text-xs">{item.reviewText}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid ${gridCols} gap-6 mb-8`}>
          {row.map((item, index) => (
            <div key={type === 'photocard' ? item.photoCardId : item.reviewId} className={`${itemSize} relative`}>
              {renderItem(item, rowIndex * itemsPerRow + index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridDisplay;