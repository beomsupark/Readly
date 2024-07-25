import BookImg1 from "../../assets/onboard/book.jpg";
import ProgressBar from "./ProgressBar";  // 새로 만든 ProgressBar 컴포넌트를 import

const Mybooks = [
  {
    id: 1,
    title: "책 제목 1",
    cover: BookImg1,
    totalPages: 400,
    currentPage: 50,
  },
  {
    id: 2,
    title: "책 제목 2",
    cover: BookImg1,
    totalPages: 250,
    currentPage: 100,
  },
];

export default function ProgressComponent() {

  return (
    <>
      <div className="container mx-auto p-4">
        {Mybooks.length === 0 ? (
          <div className="bg-white p-4 rounded-lg mb-4 flex z-100 w-3/5">
            <div className="flex justify-center items-center bg-[#F5F5F5] w-[9rem] h-[12rem]">
              <h1 className="text-5xl text-[#FFFFFF]">+</h1>
            </div>
          </div>
        ) : (
          Mybooks.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg mb-4 flex z-100 w-3/5"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-[8rem] h-[12rem] mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>

                <ProgressBar currentPage={book.currentPage} totalPages={book.totalPages} />

                <div>
                  <h2 className="font-bold mb-2">
                    <span className="text-custom-highlight">책 </span>에 대한{" "}
                    <span className="text-custom-highlight">한줄평</span>을
                    남기고 싶으신가요?
                  </h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="한줄평을 입력해주세요"
                    />
                    <button className="w-[6em] ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                      만들기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="mt-4 flex justify-start">
          <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
            책 추가하기
          </button>
        </div>
      </div>

      
    </>
  );
}