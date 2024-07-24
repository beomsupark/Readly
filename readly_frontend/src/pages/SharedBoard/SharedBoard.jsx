import { useState } from 'react'
import CustomRadioButton from "../../components/RadioButton/CustomRadioButton"
import GridDisplay from './GridDisplay.jsx'

import CardImg1 from '../../assets/onboard/card1_front.png';
import CardImg1_back from '../../assets/onboard/card1_back.png';
import CardImg2 from '../../assets/onboard/card2.png';
import CardImg3 from '../../assets/onboard/card3.png';

const dummyPhotocards = [
  { id: 1, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
  { id: 2, title: '책 제목 1', cover: CardImg2, back: CardImg1_back },
  { id: 3, title: '책 제목 1', cover: CardImg3, back: CardImg1_back },
  { id: 4, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
  { id: 5, title: '책 제목 1', cover: CardImg2, back: CardImg1_back },
  { id: 6, title: '책 제목 1', cover: CardImg3, back: CardImg1_back },
  { id: 7, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
  { id: 8, title: '책 제목 1', cover: CardImg2, back: CardImg1_back },
  { id: 9, title: '책 제목 1', cover: CardImg3, back: CardImg1_back },
  { id: 10, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
];

const dummyReviews = [
  {
    id: 1,
    bookImage: CardImg1,
    title: '나는 도대체 왜 피곤할까',
    author: '에이미 사',
    review: '우리 몸이 왜 피곤하고 엄증에 관여여 포르몬에 관여여 일고싶게 설명되어있고 WTF방법과 실천까지 자세하게 설명되어 있어서 이대로만 따라하면 난 신선와 물을 가질 수 있을것 같다.',
  },
  {
    id: 2,
    bookImage: CardImg1,
    title: '나는 도대체 왜 피곤할까',
    author: '에이미 사',
    review: '우리 몸이 왜 피곤하고 엄증에 관여여 포르몬에 관여여 일고싶게 설명되어있고 WTF방법과 실천까지 자세하게 설명되어 있어서 이대로만 따라하면 난 신선와 물을 가질 수 있을것 같다.',
  },
  // ... 더 많은 리뷰 데이터
];

export default function SharedBoard() {
  const [visibility, setVisibility] = useState('최신순');
  const [activeLink, setActiveLink] = useState("photocard"); // Default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  }

  return (
    <>
      <div className="flex-col">
        {/* 포토카드, 한줄평 탭 */}
        <div className="w-full p-4">
          <div className="flex space-x-6">
            <a
              href="#"
              className={`font-bold text-2xl ${activeLink === "photocard"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
                }`}
              onClick={() => handleLinkClick("photocard")}
            >
              포토카드
            </a>
            <a
              href="#"
              className={`font-bold text-2xl ${activeLink === "review"
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
                }`}
              onClick={() => handleLinkClick("review")}
            >
              한줄평
            </a>
          </div>
        </div>

        {/* 최신순, 좋아요순, 팔로우만 */}
        <div className="mt-5 ml-3 justify-start sm:w-40 lg:w-48">
          <CustomRadioButton
            options={['최신순', '좋아요순', '팔로우만']}
            selectedOption={visibility}
            onChange={setVisibility}
          />
        </div>
      </div>
      <div className="mt-5 -ml-1">
        {/* 포토카드와 한줄평을 출력하는 공간 */}
        {activeLink === "photocard" && <GridDisplay items={dummyPhotocards} type="photocard" />}
        {activeLink === "review" && <GridDisplay items={dummyReviews.map(review => ({
          ...review,
          likeCount: review.like // 'like' 필드를 'likeCount'로 매핑
        }))} type="review" />}
      </div>
    </>
  )
}