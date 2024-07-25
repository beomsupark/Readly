import { useState } from "react";
import levelIcon from "../../assets/level/lv1.png";
import catCoin from "../../assets/level/cat_coin.png";
import CardImg1 from "../../assets/onboard/card1_front.png";
import CardImg1_back from "../../assets/onboard/card1_back.png";
import ReviewImg1 from "../../assets/onboard/review1.png";
import MypageProgress from "./MyPageProgress";
import MypageBookshelf from "./MyPageBookshelf";
import MypageFollow from "./MyPageFollow";
import TimeCat from "../../assets/onboard/time_cat.png";
import Timecapsule from "./Timecapsule"

export default function MyPage() {
  const [activeLink, setActiveLink] = useState("progress"); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const Myheader = () => (
    <header className="flex justify-between items-center py-1 px-3 bg-white">
      <div className="flex-cols items-center">
        <img className="w-16 h-14 mr-2" src={levelIcon} alt="level" />
        <p className="font-bold center text-xl">Lv1</p>
      </div>
      <div>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">닉네임</h2>
          <a href="/edit" className="ml-2 text-lg">
            ✏️
          </a>
        </div>
        <p className="text-base">한줄소개</p>
      </div>
      <div className="flex-1 flex flex-col justify-end items-end mr-6">
        <div className="flex items-center">
          <span className="text-lg">포인트</span>
          <img className="w-6 h-6 mr-1" src={catCoin} alt="coin" />
        </div>
      </div>
    </header>
  );

  const myPhotocards = [
    { id: 1, title: "책 제목 1", cover: CardImg1, back: CardImg1_back },
    { id: 2, title: "책 제목 2", cover: CardImg1, back: CardImg1_back },
    { id: 3, title: "책 제목 3", cover: CardImg1, back: CardImg1_back },
    { id: 4, title: "책 제목 4", cover: CardImg1, back: CardImg1_back },
  ];

  const myReviews = [
    { id: 1, title: "책 제목 1", cover: ReviewImg1 },
    { id: 2, title: "책 제목 2", cover: ReviewImg1 },
    { id: 3, title: "책 제목 3", cover: ReviewImg1 },
    { id: 4, title: "책 제목 4", cover: ReviewImg1 },
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

        <div>
          {activeLink === "progress" && (
            <div>
              <MypageProgress />
            </div>
          )}
          {activeLink === "bookshelf" && <MypageBookshelf />}
          {activeLink === "follow" && (
            <div>
              <MypageFollow />
            </div>
          )}
        </div>

        <div className="fixed bottom-10 right-40 flex flex-col items-end z-10">
          <img src={TimeCat} alt="timecat" className="w-[12rem] mb-2" />
          <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            타임캡슐 만들기
          </button>
        </div>

        {activeLink !== "progress" && (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-4">
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
            </div>

            <div className="bg-white rounded-lg shadow p-4">
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
            </div>
          </>
        )}
      </div>

      <Timecapsule
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </>
  );
}
