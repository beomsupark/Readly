import { useState, useEffect } from "react";
import BookImg1 from "../../assets/onboard/book.jpg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import GoButton from "../../components/GoButton/GoButton";
import CreateReview from "../../components/Review/CreateReview";
import Search from "../../components/Search";
import { proceedingBooks } from '../../api/mypageAPI'; // API 함수 import

export default function MypageProgress({ userId }) {
  const [books, setBooks] = useState([]);
  const [reviewInputs, setReviewInputs] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await proceedingBooks(userId);
        const formattedBooks = fetchedBooks.map(book => ({
          id: book.readBookId,
          title: book.title,
          cover: book.image || BookImg1,
          totalPages: book.totalPages,
          currentPage: book.curruntPage,
          review: book.detail || "",
          author: book.author
        }));
        setBooks(formattedBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, [userId]);

  const updateCurrentPage = (bookId, newPage) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, currentPage: newPage } : book
      )
    );
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setReviewInputs((prev) => ({ ...prev, [book.id]: prev[book.id] || "" }));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalIsOpen(false);
  };

  const openSearchModal = () => {
    setSearchModalIsOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalIsOpen(false);
  };

  const handleReviewInputChange = (bookId, value) => {
    setReviewInputs((prev) => ({ ...prev, [bookId]: value }));
  };

  const handleCreateReview = () => {
    if (selectedBook && reviewInputs[selectedBook.id]?.trim()) {
      setBooks(
        books.map((book) =>
          book.id === selectedBook.id
            ? { ...book, review: reviewInputs[selectedBook.id] }
            : book
        )
      );
      setReviewInputs((prev) => ({ ...prev, [selectedBook.id]: "" }));
      closeModal();
    }
  };

  const addNewBook = (newBook) => {
    const isBookExists = books.some(book => book.id === newBook.id);
    
    if (!isBookExists) {
      const bookToAdd = {
        id: newBook.id,
        title: newBook.title,
        cover: newBook.image || BookImg1,
        totalPages: newBook.totalPages || 100,
        currentPage: 0,
        review: "",
        author: newBook.author
      };
      
      setBooks(prevBooks => [...prevBooks, bookToAdd]);
    }
    closeSearchModal();
  };

  return (
    <>
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
                <p className="text-sm text-gray-600 mb-2">저자: {book.author}</p>
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
                    <span className="text-custom-highlight">한줄평</span>을
                    남기고 싶으신가요?
                  </h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="w-[30rem] mt-1 p-2 border rounded-lg"
                      placeholder="한줄평을 입력해주세요"
                      value={reviewInputs[book.id] || ""}
                      onChange={(e) =>
                        handleReviewInputChange(book.id, e.target.value)
                      }
                    />
                    <GoButton text="생성" onClick={() => openModal(book)} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="mt-4 flex justify-start">
          <GoButton text="책 등록하기" onClick={openSearchModal} />
        </div>
      </div>

      {selectedBook && (
        <CreateReview
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          book={selectedBook}
          reviewText={reviewInputs[selectedBook.id] || ""}
          onReviewSubmit={handleCreateReview}
        />
      )}

      <Search
        isOpen={searchModalIsOpen}
        onRequestClose={closeSearchModal}
        onBookSelect={addNewBook}
      />
    </>
  );
}