import { useState } from "react";
import BookImg1 from "../../assets/onboard/book.jpg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import GoButton from "../../components/GoButton/GoButton";

const myBooks = [
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
  const [books, setBooks] = useState(myBooks);

  const updateCurrentPage = (bookId, newPage) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, currentPage: newPage } : book
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      {books.length === 0 ? (
        <div className="bg-white p-4 rounded-lg mb-4 flex z-100 w-3/5">
          <div className="flex justify-center items-center bg-[#F5F5F5] w-[9rem] h-[12rem]">
            <h1 className="text-5xl text-[#FFFFFF]">+</h1>
          </div>
        </div>
      ) : (
        books.map((book) => (
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

              <ProgressBar
                currentPage={book.currentPage}
                totalPages={book.totalPages}
                onUpdateCurrentPage={(newPage) =>
                  updateCurrentPage(book.id, newPage)
                }
              />

              <div>
                <h2 className="font-bold mb-2">
                  <span className="text-custom-highlight">책 </span>에 대한{" "}
                  <span className="text-custom-highlight">한줄평</span>을 남기고
                  싶으신가요?
                </h2>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="w-[30rem] mt-1 p-2 border rounded-lg"
                    placeholder="한줄평을 입력해주세요"
                  />
                  <GoButton text="생성" />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="mt-4 flex justify-start">
        <GoButton text="책 등록하기" />
      </div>
    </div>
  );
}