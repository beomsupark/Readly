import { useState, useEffect } from 'react';
import CustomRadioButton from "../../components/RadioButton/CustomRadioButton";
import GridDisplay from './GridDisplay.jsx';
import usePhotocardStore from '../../store/photocardStore';
import useReviewStore from '../../store/reviewStore';

export default function SharedBoard() {
  const { 
    photocards, 
    loading: photocardsLoading, 
    error: photocardsError, 
    fetchPhotocards, 
    setOrderType: setPhotocardOrderType, 
    setSearchType: setPhotocardSearchType 
  } = usePhotocardStore();

  const { 
    reviews, 
    loading: reviewsLoading, 
    error: reviewsError, 
    fetchReviews, 
    setOrderType: setReviewOrderType, 
    setSearchType: setReviewSearchType 
  } = useReviewStore();
  
  const [activeLink, setActiveLink] = useState("photocard");

  useEffect(() => {
    if (activeLink === "photocard") {
      fetchPhotocards();
    } else {
      fetchReviews();
    }
  }, [activeLink]);

  const handleOrderChange = (value) => {
    const orderType = 'DESC';
    const searchType = value === 'latest' ? 'TimeStamp' : 'Like';
    
    if (activeLink === "photocard") {
      setPhotocardOrderType(orderType);
      setPhotocardSearchType(searchType);
      fetchPhotocards();
    } else {
      setReviewOrderType(orderType);
      setReviewSearchType(searchType);
      fetchReviews();
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const loading = activeLink === "photocard" ? photocardsLoading : reviewsLoading;
  const error = activeLink === "photocard" ? photocardsError : reviewsError;
  const items = activeLink === "photocard" ? photocards : reviews;

  return (
    <>
      <div className="flex-col">
        {/* 포토카드, 한줄평 탭 */}
        <div className="w-full p-4">
          <div className="flex space-x-6">
            <a
              href="#"
              className={`font-bold text-2xl ${activeLink === "photocard"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
                }`}
              onClick={() => handleLinkClick("photocard")}
            >
              포토카드
            </a>
            <a
              href="#"
              className={`font-bold text-2xl ${activeLink === "review"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
                }`}
              onClick={() => handleLinkClick("review")}
            >
              한줄평
            </a>
          </div>
        </div>

        {/* 최신순, 좋아요순 */}
        <div className="ml-3 justify-start sm:w-40 lg:w-48">
          <CustomRadioButton
            options={[
              { label: '최신순', value: 'latest' },
              { label: '좋아요순', value: 'popular' },
            ]}
            selectedOption={activeLink === "photocard" 
              ? (usePhotocardStore.getState().searchType === 'TimeStamp' ? 'latest' : 'popular')
              : (useReviewStore.getState().searchType === 'TimeStamp' ? 'latest' : 'popular')
            }
            onChange={handleOrderChange}
          />
        </div>
      </div>
      <div className="mt-5 -ml-1">
        {loading && <p>로딩 중...</p>}
        {error && <p>에러: {error}</p>}
        {!loading && !error && (
          <GridDisplay items={items} type={activeLink} />
        )}
      </div>
    </>
  )
}