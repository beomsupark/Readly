import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import levelIcon1 from "../../assets/level/lv1.png";
import levelIcon2 from "../../assets/level/lv2.png";
import levelIcon3 from "../../assets/level/lv3.png";
import levelIcon4 from "../../assets/level/lv4.png";
import catCoin from "../../assets/level/cat_coin.png";
import CardImg1 from "../../assets/onboard/card1_front.png";
import CardImg2 from "../../assets/onboard/card2.png";
import CardImg3 from "../../assets/onboard/card3.png";
import CardImg4 from "../../assets/onboard/card4.png";
import CardImg1_back from "../../assets/onboard/card1_back.png";
import ReviewImg1 from "../../assets/onboard/review1.png";
import ReviewImg2 from "../../assets/onboard/review2.png";
import ReviewImg3 from "../../assets/onboard/review3.png";
import ReviewImg4 from "../../assets/onboard/review4.png";
import BookImg1 from "../../assets/onboard/book.jpg";
import MypageProgress from "./MyPageProgress";
import MypageBookshelf from "./MyPageBookshelf";
import MypageFollow from "./MyPageFollow";
import TimeCat from "../../assets/onboard/time_cat.png";
import TimecapsulePeriod from "../Timecapsule/TimecapsulePeriod";
import GoButton from "../../components/GoButton/GoButton";
import LogoutButton from "../Login/Logout";
import PhotocardList from "./PhotocardListModal";
import ReviewList from "./ReviewListModal";
import useUserStore from "../../store/userStore";

export default function MyPage() {
  const user = useUserStore(state => state.user);

  const { userId } = useParams();
  const [activeLink, setActiveLink] = useState("progress");
  const [timecapsuleModalIsOpen, setTimecapsuleModalIsOpen] = useState(false);
  const [photocardModalIsOpen, setPhotocardModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const calculateLevel = (point) => {
    if (point < 1000) return 1;
    if (point < 2000) return 2;
    if (point < 3000) return 3;
    return 4;
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 1: return levelIcon1;
      case 2: return levelIcon2;
      case 3: return levelIcon3;
      case 4: return levelIcon4;
      default: return levelIcon1;
    }
  };

  const myFollow = [
    // ... 기존 myFollow 데이터
  ];

  const myReadBooks = [
    // ... 기존 myReadBooks 데이터
  ];

  useEffect(() => {
    if (userId) {
      const user = myFollow.find((user) => user.id === parseInt(userId));
      setSelectedUser(user);
    }
  }, [userId]);

  const Myheader = () => {
    const userLevel = calculateLevel(user.point);
    const levelIcon = getLevelIcon(userLevel);

    return (
      <header className="flex justify-between items-center py-1 px-3 bg-white">
        <div className="flex-cols items-center mr-2">
          {isOwnProfile ? (
            <>
              <img className="w-16 h-14 mr-2" src={levelIcon} alt="level" />
              <p className="font-bold text-center text-xl">Lv{userLevel}</p>
            </>
          ) : selectedUser ? (
            <>
              <img
                className="w-16 h-14 mr-2"
                src={getLevelIcon(calculateLevel(selectedUser.point))}
                alt="level"
              />
              <p className="font-bold text-center text-xl">
                Lv{calculateLevel(selectedUser.point)}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <div className="flex items-center">
            {isOwnProfile ? (
              <>
                <h2 className="text-2xl font-bold">{user.nickname}</h2>
                <a href="/edit" className="ml-2 text-lg">
                  ✏️
                </a>
              </>
            ) : (
              <h2 className="text-2xl font-bold">
                {selectedUser ? selectedUser.nickname : "Loading..."}
              </h2>
            )}
          </div>
          <p className="text-base">{user.introduction}</p>
        </div>
        <div className="flex-1 flex flex-col justify-end items-end mr-6">
          <div className="flex-col items-center">
            <div className="flex justify-end mb-2">
              <span className="text-base font-bold">{user.point}</span>
              <img className="w-6 h-6 ml-2" src={catCoin} alt="coin" />
            </div>
            {isOwnProfile && (
              <div className="flex">
                <LogoutButton textColor="#878787" textSize="base" />
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };

  const myPhotocards = [
    // ... 기존 myPhotocards 데이터
  ];

  const myReviews = [
    // ... 기존 myReviews 데이터
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
              <MypageProgress />
            </div>
          )}
          {activeLink === "bookshelf" && (
            <MypageBookshelf books={myReadBooks} />
          )}
          {activeLink === "follow" && (
            <div>
              <MypageFollow follows={myFollow} />
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