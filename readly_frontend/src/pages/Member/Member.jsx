import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import levelIcon1 from "../../assets/level/lv1.png";
import levelIcon2 from "../../assets/level/lv2.png";
import levelIcon3 from "../../assets/level/lv3.png";
import levelIcon4 from "../../assets/level/lv4.png";
import catCoin from "../../assets/level/cat_coin.png";
import FollowButton from "../../components/Follow/Follow.jsx"
import { getFollowers } from "../../api/mypageAPI";

export default function Member() {
  const { memberId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [memberId]);

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
          <FollowButton />
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
            {/* {user.books.length > 0 ? (
              user.books.map((book) => (
                <div key={book.id} className="bg-gray-200 p-2 rounded">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-auto h-[6rem]"
                  />
                </div>
              ))
            ) : (
              renderEmptyItems(1)
            )} */}
          </div>

          <div className="absolute top-4 right-4">
            <button
              // onClick={openModal}
              className="text-blue-500 hover:text-blue-700 text-lg font-bold"
            >
              <span className="text-custom-highlight">&gt;</span>{" "}
              <span className="text-[1rem] text-[#868686]">더보기</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-bold mb-2">내가 만든 포토카드</h3>
            <div className="flex flex-wrap gap-1">
              {/* {user.myPhotocards.length > 0 ? (
                user.myPhotocards.map((card) => (
                  <div key={card.photocardId} className="bg-gray-200 p-2 rounded">
                    <img
                      src={card.photocardImage}
                      alt={card.bookTitle}
                      className="w-[5rem] h-[5rem] object-cover"
                    />
                  </div>
                ))
              ) : (
                renderEmptyItems(1)
              )} */}
            </div>
            <div className="absolute top-4 right-4">
              <button
                // onClick={openPhotocardModal}
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
              {/* {user.myReviews.length > 0 ? (
                user.myReviews.map((review) => (
                  <Review
                    key={review.reviewId}
                    bookImage={review.bookImage}
                    title={review.bookTitle}
                    author={review.bookAuthor}
                    review={review.reviewText}
                    likeCount={review.likeCount}
                  />
                ))
              ) : (
                renderEmptyItems(1)
              )} */}
            </div>
            <div className="absolute top-4 right-4">
              <button
                // onClick={openReviewModal}
                className="text-blue-500 hover:text-blue-700 text-lg font-bold mr-80"
              >
                <span className="text-custom-highlight">&gt;</span>{" "}
                <span className="text-[1rem] text-[#868686]">더보기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}