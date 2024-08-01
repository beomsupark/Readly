import { useState } from "react";
import LevelIcon1 from "../../assets/level/lv1.png";
import LevelIcon2 from "../../assets/level/lv2.png";
import InfoIcon from "../../assets/header/info_img.png";
import FollowList from "./FollowModal";
// import FollowUserPageModal from "./FollowUserPageModal";

export default function MypageFollow({ follows }) {
  const [followListModalIsOpen, setFollowListModalIsOpen] = useState(false);
  const [followUserPageModalIsOpen, setFollowUserPageModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openFollowListModal = () => {
    setFollowListModalIsOpen(true);
  };

  const closeFollowListModal = () => {
    setFollowListModalIsOpen(false);
  };

  const openFollowUserPageModal = (user) => {
    setSelectedUser(user);
    setFollowUserPageModalIsOpen(true);
  };

  const closeFollowUserPageModal = () => {
    setFollowUserPageModalIsOpen(false);
    setSelectedUser(null); // Reset selected user when closing
  };

  const levelIcons = {
    1: LevelIcon1,
    2: LevelIcon2,
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex space-x-2 mb-2 gap-4">
          {follows.map((user) => (
            <div
              key={user.id}
              onClick={() => openFollowUserPageModal(user)}
              className="bg-gray-200 p-2 rounded-xl flex-cols items-center bg-[#F5F5F5] cursor-pointer"
            >
              <img
                src={levelIcons[user.level]}
                alt={`Level ${user.level}`}
                className="w-7 h-7 mr-2"
              />
              <div className="ml-4">
                <img src={InfoIcon} alt="info" className="w-12 h-10" />
                <p className="font-semibold">{user.nickname}</p>
                <p className="text-sm text-gray-600">{user.intro}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={openFollowListModal}
            className="text-blue-500 hover:text-blue-700 text-lg font-bold"
          >
            <span className="text-custom-highlight">&gt;</span>{" "}
            <span className="text-[1rem] text-[#868686]">더보기</span>
          </button>
        </div>
      </div>

      <FollowList
        isOpen={followListModalIsOpen}
        onRequestClose={closeFollowListModal}
        books={follows}
      />

      {selectedUser && (
        <FollowUserPageModal
          isOpen={followUserPageModalIsOpen}
          onRequestClose={closeFollowUserPageModal}
          user={selectedUser}
        />
      )}
    </>
  );
}
