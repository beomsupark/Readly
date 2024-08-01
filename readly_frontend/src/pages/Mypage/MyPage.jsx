import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import levelIcon1 from "../../assets/level/lv1.png";
import levelIcon2 from "../../assets/level/lv2.png";
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

export default function MyPage() {
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

  const levelIcons = {
    1: levelIcon1,
    2: levelIcon2,
  };

  const myFollow = [
    {
      id: 1,
      nickname: "닉네임 1",
      intro: "한줄소개 1",
      level: 1,
      readBooks: [
        {
          id: 1,
          title: "책 제목 1",
          cover: BookImg1,
          description: "책 설명 1",
        },
      ],
      photocards: [
        {
          id: 1,
          title: "책 제목 1",
          cover: CardImg1,
          back: CardImg1_back,
          create: "2024-07-30",
        },
      ],
      reviews: [
        { id: 1, title: "책 제목 1", cover: ReviewImg1, create: "2024-07-30" },
      ],
    },
    {
      id: 2,
      nickname: "닉네임 2",
      intro: "한줄소개 2",
      level: 2,
      readBooks: [
        {
          id: 1,
          title: "책 제목 1",
          cover: BookImg1,
          description: "책 설명 1",
        },
        {
          id: 2,
          title: "책 제목 2",
          cover: BookImg1,
          description: "책 설명 2",
        },
      ],
      photocards: [
        {
          id: 1,
          title: "책 제목 1",
          cover: CardImg1,
          back: CardImg1_back,
          create: "2024-07-30",
        },
        {
          id: 2,
          title: "책 제목 2",
          cover: CardImg2,
          back: CardImg1_back,
          create: "2024-07-29",
        },
      ],
      reviews: [
        { id: 1, title: "책 제목 1", cover: ReviewImg1, create: "2024-07-30" },
        { id: 2, title: "책 제목 2", cover: ReviewImg2, create: "2024-07-29" },
      ],
    },
  ];

  const myReadBooks = [
    { id: 1, title: "책 제목 1", cover: BookImg1, description: "책 설명 1" },
    { id: 2, title: "책 제목 2", cover: BookImg1, description: "책 설명 2" },
    { id: 3, title: "책 제목 3", cover: BookImg1, description: "책 설명 3" },
    { id: 4, title: "책 제목 4", cover: BookImg1, description: "책 설명 4" },
  ];

  useEffect(() => {
    if (userId) {
      // 여기서 userId에 해당하는 유저 정보를 가져오는 API 호출을 할 수 있습니다.
      // 예시로 myFollow 배열에서 찾는 방식을 사용하겠습니다.
      const user = myFollow.find((user) => user.id === parseInt(userId));
      setSelectedUser(user);
    }
  }, [userId]);

  const Myheader = () => (
    <header className="flex justify-between items-center py-1 px-3 bg-white">
      <div className="flex-cols items-center mr-2">
        {isOwnProfile ? (
          <>
            <img className="w-16 h-14 mr-2" src={levelIcon1} alt="level" />
            <p className="font-bold text-center text-xl">Lv1</p>
          </>
        ) : selectedUser ? (
          <>
            <img
              className="w-16 h-14 mr-2"
              src={levelIcons[selectedUser.level]}
              alt="level"
            />
            <p className="font-bold text-center text-xl">
              Lv{selectedUser.level}
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
              <h2 className="text-2xl font-bold">닉네임</h2>
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
        <p className="text-base">
          {isOwnProfile
            ? "한줄소개"
            : selectedUser
            ? selectedUser.intro
            : "Loading..."}
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-end items-end mr-6">
        <div className="flex-col items-center">
          <div className="flex justify-end mb-2">
            <span className="text-base font-bold">포인트</span>
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

  const myPhotocards = [
    {
      id: 1,
      title: "책 제목 1",
      cover: CardImg1,
      back: CardImg1_back,
      create: "2024-07-30",
    },
    {
      id: 2,
      title: "책 제목 2",
      cover: CardImg2,
      back: CardImg1_back,
      create: "2024-07-29",
    },
    {
      id: 3,
      title: "책 제목 3",
      cover: CardImg3,
      back: CardImg1_back,
      create: "2024-06-30",
    },
    {
      id: 4,
      title: "책 제목 4",
      cover: CardImg4,
      back: CardImg1_back,
      create: "2024-06-29",
    },
  ];

  const myReviews = [
    { id: 1, title: "책 제목 1", cover: ReviewImg1, create: "2024-07-30" },
    { id: 2, title: "책 제목 2", cover: ReviewImg2, create: "2024-07-29" },
    { id: 3, title: "책 제목 3", cover: ReviewImg3, create: "2024-06-30" },
    { id: 4, title: "책 제목 4", cover: ReviewImg4, create: "2024-06-29" },
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
