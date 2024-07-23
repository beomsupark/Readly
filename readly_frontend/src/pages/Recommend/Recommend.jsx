export default function Recommend() {
  const Book = {
    title: '코끼리의 마음',
    description: '매일 나무에 오르고 떨어지는 코끼리를 통해 각자 다른 삶의 방식과 태도에 대해 이야기하는 동화 소설. 2017년에 출간되어 국내 독자들에게 큰 사랑을 받은 .책 제목. 의 작가 톤 텔레헨의 두 번째 어른 동화 소설이다.',
    author: '톤 텔레헨'
  };

  return (
    <>
      <div className="ml-3 mb-6 lg:px-4"> {/* 왼쪽 여백과 아래 여백 추가 */}
        <h2 className="font-bold text-2xl">
          <span className="text-custom-highlight">리들리 AI</span>가 추천하는 <span className="text-custom-highlight">책</span>
        </h2>
      </div>
      <div className="mt-4 mx-auto max-w-5xl lg:px-6"> {/* 왼쪽, 오른쪽 패딩 추가 */}
        <div className="flex bg-[#F1EFEF] p-6 rounded-lg shadow-md w-full px-6"> {/* 왼쪽, 오른쪽 패딩 추가 */}
          <div className="w-1/4 pr-6"> {/* 오른쪽 패딩 추가 */}
            <img src="/path-to-your-image.png" alt="Book Cover" className="w-full h-auto rounded-md" />
          </div>
          <div className="w-3/4 pl-6"> {/* 왼쪽 패딩 추가 */}
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl">{Book.title}</h3>
                  <button
                    // onClick={}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <span className="text-sm text-[#868686] -mt-5 font-bold">다른 책을 원하시나요? </span>
                    <span className="text-xl text-custom-highlight -mt-5 ml-2">&gt;</span>
                  </button>
                </div>
                <p className="text-lg mb-2">{Book.author}</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {Book.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
