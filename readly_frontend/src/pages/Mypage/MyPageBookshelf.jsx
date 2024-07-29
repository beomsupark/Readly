import { useState } from "react";

import BookImg1 from "../../assets/onboard/book.jpg";
import BookshelfList from "./BookshelfModal";

export default function MypageBookshelf() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const myBooks = [
    { id: 1, title: "책 제목 1", cover: BookImg1, description: "책 설명 1" },
    { id: 2, title: "책 제목 2", cover: BookImg1, description: "책 설명 2" },
    { id: 3, title: "책 제목 3", cover: BookImg1, description: "책 설명 3" },
    { id: 4, title: "책 제목 4", cover: BookImg1, description: "책 설명 4" },
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex space-x-2 mb-2">
          {myBooks.map((book) => (
            <div key={book.id} className="bg-gray-200 p-2 rounded">
              <img
                src={book.cover}
                alt={book.title}
                className="w-auto h-[7rem]"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={openModal}
            className="text-blue-500 hover:text-blue-700 text-lg font-bold"
          >
            <span className="text-custom-highlight">&gt;</span>{" "}
            <span className="text-[1rem] text-[#868686]">더보기</span>
          </button>
        </div>
      </div>

      <BookshelfList
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        books={myBooks}
      />
    </>
  );
}