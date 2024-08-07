import { useState, useEffect } from "react";
import BookshelfList from "./BookshelfModal";
import { readBooks } from "../../api/mypageAPI";

export default function MypageBookshelf({ userId }) {
  const [books, setBooks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const fetchedBooks = await readBooks(userId);
        console.log("Fetched books:", fetchedBooks); // 데이터 구조 확인을 위한 로그
        setBooks(fetchedBooks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('책을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [userId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (isLoading) {
    return <div>책을 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex space-x-2 mb-2">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="bg-gray-200 p-2 rounded">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-auto h-[6rem]"
                />
              </div>
            ))
          ) : (
            <div className="bg-gray-200 p-2 rounded w-[5rem] h-[5rem] flex items-center justify-center">

            </div>
          )}
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