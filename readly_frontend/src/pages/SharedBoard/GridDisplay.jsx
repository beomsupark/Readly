import { useState } from 'react';
import '../../pages/Photocard/photocard_flip.css';
import Review from '../../components/Review/Review';

const GridDisplay = ({ items, type }) => {
  const [flippedItems, setFlippedItems] = useState(new Array(items.length).fill(false));

  const handleFlip = (index) => {
    const updatedFlippedItems = [...flippedItems];
    updatedFlippedItems[index] = !updatedFlippedItems[index];
    setFlippedItems(updatedFlippedItems);
  };

  // type에 따라 그리드 열 수와 아이템 크기를 조정합니다.
  const gridCols = type === 'review' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3 lg:grid-cols-6';
  const itemSize = type === 'review' ? 'w-60 h-80' : 'w-40 h-60';

  // 한 행에 들어갈 아이템 수를 조정합니다.
  const itemsPerRow = type === 'review' ? 4 : 6;

  // itemsPerRow개씩 그룹화하여 행을 만듭니다.
  const rows = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }

  // 마지막 행이 itemsPerRow개 미만일 경우 빈 객체로 채웁니다.
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
              <img src={item.cover} alt={item.title} />
            </div>
            <div className="flip-card-back img-container">
              <img src={item.back} alt={item.title} />
            </div>
          </div>
        </div>
      );
    } else if (type === 'review') {
      return (
        <Review
          bookImage={item.bookImage}
          title={item.title}
          author={item.author}
          review={item.review}
        />
      );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid ${gridCols} gap-6 mb-8`}>
          {row.map((item, index) => (
            <div key={item.id} className={`${itemSize} relative`}>
              {renderItem(item, rowIndex * itemsPerRow + index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridDisplay;