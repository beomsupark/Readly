import { useState, useEffect } from "react";
import LevelIcon1 from "../../assets/level/lv1.png";
import LevelIcon2 from "../../assets/level/lv2.png";
import LevelIcon3 from "../../assets/level/lv3.png";
import LevelIcon4 from "../../assets/level/lv4.png";
import InfoIcon from "../../assets/header/info_img.png";
import FollowList from "./FollowModal";
// import FollowUserPageModal from "./FollowUserPageModal"
import { getFollowers } from "../../api/mypageAPI";

export default function MypageFollow({ userId }) {
  const [followListModalIsOpen, setFollowListModalIsOpen] = useState(false);
  const [followUserPageModalIsOpen, setFollowUserPageModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [follows, setFollows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setIsLoading(true);
        const fetchedFollowers = await getFollowers(userId);
        
        // Calculate level for each follower and add it to the follower object
        const followersWithLevel = fetchedFollowers.map(user => ({
          ...user,
          level: calculateLevel(user.followedPoint)
        }));

        setFollows(followersWithLevel);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
        setError('팔로워 목록을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

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
    setSelectedUser(null);
  };

  const levelIcons = {
    1: LevelIcon1,
    2: LevelIcon2,
    3: LevelIcon3,
    4: LevelIcon4,
  };

  if (isLoading) {
    return <div>팔로워 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex space-x-2 mb-2 gap-4">
          {follows.length > 0 ? (
            follows.map((user) => (
              <div
                key={user.followedId}
                onClick={() => openFollowUserPageModal(user)}
                className="bg-gray-200 p-2 rounded-xl flex items-center bg-[#F5F5F5] cursor-pointer w-36 h-[5rem]"
              >
                <img
                  src={levelIcons[user.level]}
                  alt={`Level ${user.level}`}
                  className="w-7 h-7 mr-2 mb-9"
                />
                <div className="ml-4">
                  <img src={InfoIcon} alt="info" className="w-12 h-10" />
                  <p className="font-semibold">{user.followedName}</p>
                  {/* <p className="text-sm text-gray-600">{user.followedText}</p> */}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-200 p-2 rounded-xl flex-cols items-center bg-white w-full h-[5rem] flex justify-center items-center">
              {/* <p className="text-gray-500">팔로우한 사용자가 없습니다.</p> */}
            </div>
          )}
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
        follows={follows}
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

function calculateLevel(point) {
  if (point < 1000) return 1;
  if (point < 2000) return 2;
  if (point < 3000) return 3;
  return 4;
}
