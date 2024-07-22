import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../assets/logo/readly_logo_long.png';
import CardImg1 from '../assets/onboard/card1_front.png';
import CardImg1_back from '../assets/onboard/card1_back.png';
import CardImg2 from '../assets/onboard/card2.png';
import CardImg3 from '../assets/onboard/card3.png';
import ReviewImg1 from '../assets/onboard/review1.png';
import ReviewImg2 from '../assets/onboard/review2.png';
import ReviewImg3 from '../assets/onboard/review3.png';
import ReviewImg4 from '../assets/onboard/review4.png';
import TimeCat from '../assets/onboard/time_cat.png';
import TimeBg from '../assets/onboard/time_bg.png';
import MeetingBg from '../assets/onboard/meeting_bg.png';
import Bg from '../assets/background/background_img.png';

export default function OnBoard() {
  const [isImageFixed, setIsImageFixed] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const lastSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!lastSectionRef.current) return;

      const rect = lastSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= 0) {
        setIsImageFixed(true);

        // 스크롤 진행도에 따라 이미지 크기 조절
        const scrollProgress = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
        const newScale = 1 + scrollProgress;
        setImageScale(newScale);

        // 이미지 크기가 2배 이상이 되면 로그인 페이지로 이동
        if (newScale >= 2) {
          navigate('/login');
        }
      } else {
        setIsImageFixed(false);
        setImageScale(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);
  return (
    <div className='w-full min-h-screen bg-white p-10 flex flex-col items-center'>
      <div className='w-full space-y-80'>
        {/* 로고 및 소개 섹션 */}
        <div className='w-full h-96 rounded-lg grid justify-start' data-aos="fade-down">
          <img className="w-[28rem]" src={LogoImg} alt="Logo img.." />
          <h2 className="font-bold text-3xl -mt-28 ml-40">
            <span className="text-[#549CB9]">Read</span> + Friend<span className="text-custom-highlight">ly</span>
          </h2>
          <h1 className="font-bold text-[2.5rem] -mt-24 ml-[9.5rem]">
            리들리를 <span className="text-custom-highlight">소개</span>
          </h1>
        </div>

        <div className='w-full bg-white flex flex-col items-center'>
          <div className='w-full max-w-6xl mx-auto'>
            {/* 카드 및 텍스트 섹션 */}
            <div className="relative flex flex-col lg:flex-row items-center justify-between">
              {/* 왼쪽 카드 섹션 */}
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-right">
                <div className="relative w-[28rem] h-[32rem] -ml-32">
                  <img
                    src={CardImg1}
                    alt="Card 1"
                    className="w-64 h-96 absolute left-0 bottom-0 transform rotate-[10deg] z-10"
                  />
                  <img
                    src={CardImg2}
                    alt="Card 2"
                    className="w-64 h-96 absolute left-0 bottom-0 -mb-12 transform rotate-[35deg] z-20"
                  />
                  <img
                    src={CardImg3}
                    alt="Card 3"
                    className="w-64 h-96 absolute left-0 bottom-0 -mb-32 transform rotate-[65deg] z-30"
                  />
                </div>
              </div>

              {/* 오른쪽 카드 섹션 */}
              <div className="w-full lg:w-1/2 flex justify-end" data-aos="fade-left">
                <div className="relative w-[36rem] h-[28rem]">
                  <img
                    src={CardImg1_back}
                    alt="Right Card Back"
                    className="w-64 h-96 rounded-lg shadow-lg transform rotate-[25deg] absolute top-0 right-12 z-10"
                  />
                  <img
                    src={CardImg1}
                    alt="Right Card Front"
                    className="w-64 h-96 rounded-lg shadow-lg transform rotate-[15deg] absolute top-4 left-16 z-20"
                  />
                </div>
              </div>

              {/* 텍스트 오버레이 */}
              <div className="absolute top-0 left-0 right-0 text-center lg:text-right -mt-24">
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 ">
                  <span className="text-custom-highlight">마음에 드는 문구</span>를
                  <br />
                  <span className="text-custom-highlight">이미지</span>로 만들고 싶으신가요?
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full rounded-lg grid justify-start' data-aos="fade-down">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            <p className="mb-4">사람들과 <span className="text-custom-highlight">느낀점을</span></p>
            <p><span className="text-custom-highlight">공유</span>하고 싶으신가요?</p>
          </h2>
          <div className="mt-8 overflow-hidden">
            <div className="flex animate-slide-right">
              {[ReviewImg1, ReviewImg2, ReviewImg3, ReviewImg4].map((img, index) => (
                <div key={index} className="flex-none w-80 h-96 mx-2">
                  <img src={img} alt={`Book ${index + 1}`} className="w-full h-full object-contain rounded-lg shadow-md" />
                </div>
              ))}
              {/* 무한 루프를 위해 이미지 반복 */}
              {[ReviewImg1, ReviewImg2, ReviewImg3, ReviewImg4].map((img, index) => (
                <div key={`repeat-${index}`} className="flex-none w-80 h-96 mx-2">
                  <img src={img} alt={`Book ${index + 1}`} className="w-full h-full object-contain rounded-lg shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-y-[20rem]">
          <div className="w-2/3 justify-start relative">
            <img src={TimeBg} alt="" className="w-[40rem] h-96 absolute left-0 bottom-0 z-10" />
            <img src={TimeCat} alt="" className="w-64 h-74 absolute left-0 bottom-0 opacity-90 z-20" data-aos="fade-right" />
          </div>
          <div className="w-1/3 rounded-lg justify-end " data-aos="fade-left">
            <div className='max-w-2xl'>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-right">
                <span className="text-custom-highlight">추억</span>
                을<br />
                다시보고 싶은가요?
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={MeetingBg}
              alt=""
              className="inset-0 opacity-30 z-10"
            />
            <div className="absolute inset-0 flex items-center justify-center" >
              <h1 className='text-[3rem] font-bold text-center z-20'>
                다양한 <span className="text-custom-highlight">사람들</span>과<br />
                <span className="text-custom-highlight">독서활동</span>도 할 수 있어요
              </h1>
            </div>
          </div>
        </div>

        <div ref={lastSectionRef} className="w-full h-screen relative overflow-hidden" data-aos="fade-down">
          <img 
            src={Bg} 
            alt="" 
            className={`absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-300 ease-out
                        ${isImageFixed ? 'fixed top-0 left-0' : ''}`}
            style={{ 
              transform: `scale(${imageScale})`,
              transformOrigin: 'center center'
            }} 
          />
          <div className={`absolute inset-0 flex items-end justify-center pb-10
                           ${isImageFixed ? 'fixed' : ''}`}>
            <button
              type="button"
              className="text-white font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 z-20">
              Readly 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
