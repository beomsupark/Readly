import { useState } from "react";
import { useParams } from "react-router-dom";
import CardImg1 from "../../assets/onboard/card1_front.png";
import CardImg2 from "../../assets/onboard/card2.png";
import CardImg3 from "../../assets/onboard/card3.png";
import CardImg4 from "../../assets/onboard/card4.png";
import ReviewImg1 from "../../assets/onboard/review1.png";
import ReviewImg2 from "../../assets/onboard/review2.png";
import ReviewImg3 from "../../assets/onboard/review3.png";
import ReviewImg4 from "../../assets/onboard/review4.png";
import MypageProgress from "./MyPageProgress";
import MypageBookshelf from "./MyPageBookshelf";
import MypageFollow from "./MyPageFollow";
import TimeCat from "../../assets/onboard/time_cat.png";
import TimecapsulePeriod from "../Timecapsule/TimecapsulePeriod";
import GoButton from "../../components/GoButton/GoButton";
import PhotocardList from "./PhotocardListModal";
import ReviewList from "./ReviewListModal";
import useUserStore from "../../store/userStore";
import Myheader from "./MypageHeader";

export default function MyPage() {
  const user = useUserStore(state => state.user);
  const { userId } = useParams();
  const [activeLink, setActiveLink] = useState("progress");
  const [timecapsuleModalIsOpen, setTimecapsuleModalIsOpen] = useState(false);
  const [photocardModalIsOpen, setPhotocardModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const isOwnProfile = !userId;

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

  // useEffect(() => {
  //   if (userId) {
  //     const user = myFollow.find((user) => user.id === parseInt(userId));
  //     setSelectedUser(user);
  //   }
  // }, [userId]);

  const myPhotocards = [
    { id: 1, title: "Photocard 1", cover: CardImg1 },
    { id: 2, title: "Photocard 2", cover: CardImg2 },
    { id: 3, title: "Photocard 3", cover: CardImg3 },
    { id: 4, title: "Photocard 4", cover: CardImg4 },
  ];

  const myReviews = [
    { id: 1, title: "Review 1", cover: ReviewImg1 },
    { id: 2, title: "Review 2", cover: ReviewImg2 },
    { id: 3, title: "Review 3", cover: ReviewImg3 },
    { id: 4, title: "Review 4", cover: ReviewImg4 },
  ];

  return (
    <>
      <Myheader />
      <div className="w-full p-4">
        <div className="flex space-x-6">
          <a
            href="#"
            className={`font-bold text-2xl ${
              activeLink === "progress"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
            }`}
            onClick={() => handleLinkClick("progress")}
          >
            진행도
          </a>
          <a
            href="#"
            className={`font-bold text-2xl ${
              activeLink === "bookshelf"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
            }`}
            onClick={() => handleLinkClick("bookshelf")}
          >
            책장
          </a>
          <a
            href="#"
            className={`font-bold text-2xl ${
              activeLink === "follow"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
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
          {activeLink === "bookshelf" && (
            <MypageBookshelf userId={userId || user.id} />
          )}
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
              <div className="flex gap-1">
                {myPhotocards.map((card) => (
                  <div key={card.id} className="bg-gray-200 p-2 rounded">
                    <img
                      src={card.cover}
                      alt={card.title}
                      className="w-auto h-[5rem]"
                    />
                  </div>
                ))}
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
              <div className="flex gap-1">
                {myReviews.map((review) => (
                  <div key={review.id} className="bg-gray-200 p-2 rounded">
                    <img
                      src={review.cover}
                      alt={review.title}
                      className="w-auto h-[5rem]"
                    />
                  </div>
                ))}
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

      <ReviewList
        isOpen={reviewModalIsOpen}
        onRequestClose={closeReviewModal}
        reviews={myReviews}
      />
    </>
  );
}