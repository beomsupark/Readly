import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import levelIcon1 from "../../assets/level/lv1.png";
import levelIcon2 from "../../assets/level/lv2.png";
import levelIcon3 from "../../assets/level/lv3.png";
import levelIcon4 from "../../assets/level/lv4.png";
import catCoin from "../../assets/level/cat_coin.png";
import { getFollowers } from "../../api/mypageAPI";
import { addFollower, removeFollower } from "../../api/followAPI";
import useUserStore from '../../store/userStore';
import './follow_btn.css';

const FollowButton = ({ onClick }) => {
  return (
    <label className="follow-btn-container" onClick={onClick}>
      <input type="checkbox" defaultChecked />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="50px" width="50px" className="like">
        <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"></path>
      </svg>
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
        <polygon points="0,0 10,10"></polygon>
        <polygon points="0,25 10,25"></polygon>
        <polygon points="0,50 10,40"></polygon>
        <polygon points="50,0 40,10"></polygon>
        <polygon points="50,25 40,25"></polygon>
        <polygon points="50,50 40,40"></polygon>
      </svg>
    </label>
  );
};

export default function Member() {
  const { memberId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUserId = useUserStore(state => state.userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const followers = await getFollowers(memberId);
        const userInfo = followers.find(follower => follower.followedId === parseInt(memberId));
        if (userInfo) {
          setUser({
            ...userInfo,
            level: calculateLevel(userInfo.followedPoint)
          });
          // 여기서 팔로우 상태를 확인하는 로직을 추가할 수 있습니다.
          // 예: setIsFollowing(checkFollowStatus(currentUserId, memberId));
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [memberId, currentUserId]);

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

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        await removeFollower(currentUserId, memberId);
        setIsFollowing(false);
      } else {
        await addFollower(currentUserId, memberId);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('팔로우 작업 중 오류 발생:', error);
      // 여기에 사용자에게 오류를 표시하는 로직을 추가할 수 있습니다.
    }
  };

  const MemberHeader = ({ user }) => {
    const levelIcon = getLevelIcon(user.level);

    return (
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img className="w-13 h-10 mr-2" src={levelIcon} alt="level" />
          <p className="font-bold text-center text-xl">Lv{user.level}</p>
        </div>

        <div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.followedName}</h2>
            <FollowButton onClick={handleFollowClick} />
          </div>
          <p className="text-base">{user.followedText}</p>
        </div>

        <div className="flex items-center">
          <span className="text-base font-bold">{user.followedPoint}</span>
          <img className="w-6 h-6 ml-2" src={catCoin} alt="coin" />
        </div>
      </header>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <MemberHeader user={user} />
      <div className="w-full p-4">
        <div className="flex space-x-6">
          <p className="font-bold text-2xl text-black ">책장</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
          <div className="flex space-x-2 mb-2">
            {/* 책 목록 렌더링 로직 */}
          </div>
          <div className="absolute top-4 right-4">
            <button className="text-blue-500 hover:text-blue-700 text-lg font-bold">
              <span className="text-custom-highlight">&gt;</span>{" "}
              <span className="text-[1rem] text-[#868686]">더보기</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-bold mb-2">내가 만든 포토카드</h3>
            <div className="flex flex-wrap gap-1">
              {/* 포토카드 목록 렌더링 로직 */}
            </div>
            <div className="absolute top-4 right-4">
              <button className="text-blue-500 hover:text-blue-700 text-lg font-bold mr-80">
                <span className="text-custom-highlight">&gt;</span>{" "}
                <span className="text-[1rem] text-[#868686]">더보기</span>
              </button>
            </div>
          </div>

          <div className="relative bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-2">내가 남긴 한줄평</h3>
            <div className="flex gap-3 w-[7rem] h-[6rem]">
              {/* 리뷰 목록 렌더링 로직 */}
            </div>
            <div className="absolute top-4 right-4">
              <button className="text-blue-500 hover:text-blue-700 text-lg font-bold mr-80">
                <span className="text-custom-highlight">&gt;</span>{" "}
                <span className="text-[1rem] text-[#868686]">더보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}