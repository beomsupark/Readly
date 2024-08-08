import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimeCat from "../../assets/onboard/time_cat.png";
import MypageProgress from "./MyPageProgress";
import MypageBookshelf from "./MyPageBookshelf";
import MypageFollow from "./MyPageFollow";
import TimecapsulePeriod from "../Timecapsule/TimecapsulePeriod";
import GoButton from "../../components/GoButton/GoButton";
import PhotocardList from "./PhotocardListModal";
import ReviewList from "./ReviewListModal";
import useUserStore from "../../store/userStore";
import Myheader from "./MypageHeader";
import { getMyReviews, getMyPhotocards } from "../../api/mypageAPI";
import Review from '../../components/Review/Review';  // Import the Review component

export default function MyPage() {
  const user = useUserStore((state) => state.user);
  const { userId } = useParams();
  const [activeLink, setActiveLink] = useState("progress");
  const [timecapsuleModalIsOpen, setTimecapsuleModalIsOpen] = useState(false);
  const [photocardModalIsOpen, setPhotocardModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [myPhotocards, setMyPhotocards] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const isOwnProfile = !userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photocards = await getMyPhotocards(userId || user.id);
        const reviews = await getMyReviews(userId || user.id);
        setMyPhotocards(photocards);
        setMyReviews(reviews);
        console.log("Fetched reviews in MyPage:", reviews); // Log fetched reviews
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, user.id]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const openTimecapsuleModal = () => {
    setTimecapsuleModalIsOpen(true);
  };

  const closeTimecapsuleModal = () => {
    setTimecapsuleModalIsOpen(false);
  };

  const openPhotocardModal = () => {
    setPhotocardModalIsOpen(true);
  };

  const closePhotocardModal = () => {
    setPhotocardModalIsOpen(false);
  };

  const openReviewModal = () => {
    setReviewModalIsOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
  };

  const renderEmptyItems = (count) => {
    return Array(count)
      .fill()
      .map((_, index) => (
        <div key={`empty-${index}`} className="bg-gray-100 p-2 rounded w-[5rem] h-[6rem]"></div>
      ));
  };

  return (
    <>
      <Myheader />
      <div className="w-full p-4">
        <div className="flex space-x-6">
          <a
            href="#"
            className={`font-bold text-2xl ${
              activeLink === "progress" ? "text-black border-b-2 border-black" : "text-[#B5B5B5]"
            }`}
            onClick={() => handleLinkClick("progress")}
          >
            진행도
          </a>
          <a
            href="#"
            className={`font-bold text-2xl ${
              activeLink === "bookshelf" ? "text-black border-b-2 border-black" : "text-[#B5B5B5]"
            }`}
            onClick={() => handleLinkClick("bookshelf")}
          >
            책장
          </a>
          <a
            href="#"
            className={`font-bold text-2xl ${
              activeLink === "follow" ? "text-black border-b-2 border-black" : "text-[#B5B5B5]"
            }`}
            onClick={() => handleLinkClick("follow")}
          >
            팔로우
          </a>
        </div>

        <div className="mt-4">
          {activeLink === "progress" && (
            <div className="flex justify-start">
              <MypageProgress userId={userId || user.id} />
            </div>
          )}
          {activeLink === "bookshelf" && <MypageBookshelf userId={userId || user.id} />}
          {activeLink === "follow" && (
            <div>
              <MypageFollow userId={userId || user.id} />
            </div>
          )}
        </div>

        {isOwnProfile && (
          <div className="fixed bottom-10 right-40 flex flex-col items-end z-10">
            <img src={TimeCat} alt="timecat" className="w-[12rem] mb-2" />
            <GoButton text="타임캡슐 만들기" onClick={openTimecapsuleModal} />
          </div>
        )}

        {activeLink !== "progress" && (
          <>
            <div className="relative bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="font-bold mb-2">내가 만든 포토카드</h3>
              <div className="flex flex-wrap gap-1">
                {myPhotocards.length > 0 ? (
                  myPhotocards.map((card) => (
                    <div key={card.photocardId} className="bg-gray-200 p-2 rounded">
                      <img src={card.photocardImage} alt={card.bookTitle} className="w-[5rem] h-[5rem] object-cover" />
                    </div>
                  ))
                ) : (
                  renderEmptyItems(1)
                )}
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={openPhotocardModal}
                  className="text-blue-500 hover:text-blue-700 text-lg font-bold mr-80"
                >
                  <span className="text-custom-highlight">&gt;</span>{" "}
                  <span className="text-[1rem] text-[#868686]">더보기</span>
                </button>
              </div>
            </div>

            <div className="relative bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2">내가 남긴 한줄평</h3>
              <div className="flex gap-3 w-[7rem] h-[6rem]">
                {myReviews.length > 0 ? (
                  myReviews.map((review) => (
                    <Review
                      key={review.reviewId}
                      bookImage={review.bookImage} // Ensure this field exists
                      title={review.bookTitle}
                      author={review.bookAuthor}
                      review={review.reviewText}
                      likeCount={review.likeCount} // Ensure this field exists
                    />
                  ))
                ) : (
                  renderEmptyItems(1)
                )}
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={openReviewModal}
                  className="text-blue-500 hover:text-blue-700 text-lg font-bold mr-80"
                >
                  <span className="text-custom-highlight">&gt;</span>{" "}
                  <span className="text-[1rem] text-[#868686]">더보기</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <TimecapsulePeriod
        isOpen={timecapsuleModalIsOpen}
        onRequestClose={closeTimecapsuleModal}
        photocard={myPhotocards}
        review={myReviews}
      />

      <PhotocardList
        isOpen={photocardModalIsOpen}
        onRequestClose={closePhotocardModal}
        photocards={myPhotocards}
      />

      <ReviewList isOpen={reviewModalIsOpen} onRequestClose={closeReviewModal} reviews={myReviews} />
    </>
  );
}
