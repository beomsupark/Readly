// import level1 from "../assets/level/lv1.png"

// export default function MyPage(){
//   return (
//     <>
//     <div>
//       <img  src={level1} alt="" />
//     </div>
//     </>
//   )
// }

import levelIcon from '../assets/level/lv1.png'
import infoIcon from '../assets/header/info_img.png'
import catCoin from '../assets/level/cat_coin.png'
import CardImg1 from '../assets/onboard/card1_front.png';
import CardImg1_back from '../assets/onboard/card1_back.png';
import ReviewImg1 from '../assets/onboard/review1.png'

export default function MyPage() {
  const Myheader = () => (
    <header className="flex justify-between items-center py-1 px-3 bg-white">
      <div>
        <img className="w-12 h-12 mr-2" src={levelIcon} alt="level" />
        <p>Lv1</p>
      </div>
      <div>
        <div className="flex">
        <h2 className="text-lg font-bold">닉네임</h2>
        <span className="ml-2">✏️</span>
        </div>
        <p>한줄소개</p>
      </div>
      <div className="flex-1 flex flex-col justify-end items-end mr-6">
        <div className="flex items-center mb-1">
          <img src={infoIcon} alt="profile" className="w-[3rem] h-6 rounded-lg mr-2" />
          <span className="text-base font-bold">닉네임</span>
        </div>
        <div className="flex items-center">
          <span>포인트</span>
          <img className='w-6 h-6 mr-1' src={catCoin} alt="coin" />
        </div>
      </div>
    </header>
  );
  

  const myPhotocards = [
    { id: 1, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
    { id: 2, title: '책 제목 2', cover: CardImg1, back: CardImg1_back },
    { id: 3, title: '책 제목 3', cover: CardImg1, back: CardImg1_back },
    { id: 4, title: '책 제목 4', cover: CardImg1, back: CardImg1_back },
  ]

  const myReviews = [
    { id: 1, title: '책 제목 1', cover: ReviewImg1 },
    { id: 2, title: '책 제목 2', cover: ReviewImg1 },
    { id: 3, title: '책 제목 3', cover: ReviewImg1 },
    { id: 4, title: '책 제목 4', cover: ReviewImg1 },
  ]

  return (
    <>
      <Myheader />
      <div className="max-w-4xl mx-auto p-4">
      <h3 className="font-bold mb-2">진행도 책장 팔로우</h3>
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="w-full h-40 bg-gray-200 mb-2"></div>
          <a href="#" className="text-blue-500 text-sm">더보기</a>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-bold mb-2">내가 만든 포토카드</h3>
          <div className="grid grid-cols-4 gap-4">
            {myPhotocards.map(card => (
              <div key={card.id} className="bg-gray-200 p-2 rounded">
                <img src={card.cover} alt={card.title} className="w-auto h-20" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold mb-2">내가 남긴 한줄평</h3>
          <div className="grid grid-cols-4 gap-4">
            {myReviews.map(review => (
              <div key={review.id} className="bg-gray-200 p-2 rounded">
                <img src={review.cover} alt={review.title} className="w-auto h-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
