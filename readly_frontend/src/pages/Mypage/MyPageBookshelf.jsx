import { useState } from "react";


import BookshelfList from "./BookshelfModal";

export default function MypageBookshelf({books}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex space-x-2 mb-2">
          {books.map((book) => (
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
        books={books}
      />
    </>
  );
}