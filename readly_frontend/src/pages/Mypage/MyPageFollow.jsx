import { useState } from "react";

import LevelIcon1 from "../../assets/level/lv1.png";
import LevelIcon2 from "../../assets/level/lv2.png";
import InfoIcon from "../../assets/header/info_img.png";
import FollowList from "./FollowModal";

export default function MypageFollow() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const levelIcons = {
    1: LevelIcon1,
    2: LevelIcon2,
  };

  const myFollow = [
    {
      id: 1,
      nickname: "닉네임 1",
      intro: "한줄소개 1",
      level: 1,
    },
    {
      id: 2,
      nickname: "닉네임 2",
      intro: "한줄소개 2",
      level: 2,
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex space-x-2 mb-2 gap-4">
          {myFollow.map((card) => (
            <div
              key={card.id}
              className="bg-gray-200 p-2 rounded-xl flex-cols items-center bg-[#F5F5F5]"
            >
              <img
                src={levelIcons[card.level]}
                alt={`Level ${card.level}`}
                className="w-7 h-7 mr-2"
              />
              <div className="ml-4">
                <img src={InfoIcon} alt="info" className="w-12 h-10" />
                <p className="font-semibold">{card.nickname}</p>
                <p className="text-sm text-gray-600">{card.intro}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={openModal}
            className="text-blue-500 hover:text-blue-700 text-lg font-bold"
          >
            <span className="text-custom-highlight">&gt;</span>{" "}
            <span className="text-[1rem] text-[#868686]">더보기</span>
          </button>
        </div>
      </div>

      <FollowList
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        books={myFollow}
      />
    </>
  );
}
