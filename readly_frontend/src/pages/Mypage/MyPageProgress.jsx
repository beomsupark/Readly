import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookImg1 from "../../assets/onboard/book.jpg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import GoButton from "../../components/GoButton/GoButton";
import CreateReview from "../../components/Review/CreateReview";
import BookModal from "../../components/BookModal";
import useBookStore from "../../store/bookStore";
import useUserStore from "../../store/userStore";

export default function MyPageProgress({ userId }) {
  const [books, setBooks] = useState([]);
  const [reviewInputs, setReviewInputs] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookModalIsOpen, setBookModalIsOpen] = useState(false);
  const { books: searchResults, searchBooks } = useBookStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useUserStore();

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/member/proceeding-books/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedBooks = response.data.proceedingBooks;
      const formattedBooks = fetchedBooks.map(book => ({
        id: book.readBookId,
        bookId: book.readBookId,
        title: book.title,
        cover: book.image || BookImg1,
        totalPages: book.totalPages,
        currentPage: book.curruntPage,
        review: book.detail || "",
        author: book.author
      }));
      setBooks(formattedBooks);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const updateCurrentPage = async (bookId, newPage) => {
    try {
      await axios.put(
        "http://localhost:8080/api/member/proceeding-books/update",
        {
          bookId: bookId,
          memberId: userId,
          currentPage: newPage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.bookId === bookId ? { ...book, currentPage: newPage } : book
        )
      );
      console.log("Page updated successfully");
    } catch (error) {
      console.error("Error updating page:", error);
    }
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

  const openBookModal = () => {
    setBookModalIsOpen(true);
  };

  const closeBookModal = () => {
    setBookModalIsOpen(false);
  };

  const handleReviewInputChange = (bookId, value) => {
    setReviewInputs((prev) => ({ ...prev, [bookId]: value }));
  };
  const handleCreateReview = async ({ bookId, reviewText, visibility }) => {
    try {
      console.log("Submitting review:", { bookId, reviewText, visibility });
      const result = await postReview(
        userId,
        bookId,
        reviewText,
        visibility === "A"
      );

      console.log("Review submission result:", result);

      if (result.status === "success") {
        setBooks(
          books.map((book) =>
            book.bookId === bookId ? { ...book, review: reviewText } : book
          )
        );
        setReviewInputs((prev) => ({ ...prev, [bookId]: "" }));
        closeModal();
      } else {
        console.error("Failed to create review:", result.message);
        alert(`리뷰 생성에 실패했습니다: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("리뷰 생성 중 오류가 발생했습니다.");
    }
  };

  const addNewBook = async (newBook) => {
    try {
      console.log("Book being added:", newBook);
      const requestData = {
        memberId: userId,
        bookId: newBook.bookId,
      };
      console.log("Request data:", requestData);

      await axios.post("http://localhost:8080/api/user/add", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks((prevBooks) => [
        ...prevBooks,
        {
          id: newBook.bookId,
          title: newBook.title,
          cover: newBook.image || BookImg1,
          totalPages: newBook.totalPages || 100,
          currentPage: 0,
          review: "",
          author: newBook.author,
        },
      ]);

      closeBookModal();
    } catch (error) {
      console.error("Error adding book to user:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      throw error;
    }
  };
  const handleInputChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
      if (e.target.value) {
        searchBooks(e.target.value);
      }
    },
    [searchBooks]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      searchBooks(searchQuery);
    },
    [searchQuery, searchBooks]
  );

  const handleSuggestionClick = useCallback((book) => {
    setSelectedBook(book);
    setSearchQuery("");
  }, []);

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
                  bookId={book.bookId}
                  currentPage={book.currentPage}
                  totalPages={book.totalPages}
                  onUpdateCurrentPage={(newPage) =>
                    updateCurrentPage(book.bookId, newPage)
                  }
                  userId={userId}
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
          <GoButton text="책 등록하기" onClick={openBookModal} />
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

      <BookModal
        isOpen={bookModalIsOpen}
        onRequestClose={closeBookModal}
        book={selectedBook}
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        suggestions={searchResults}
        handleSuggestionClick={handleSuggestionClick}
        clearSearch={() => setSearchQuery("")}
        onAddBook={addNewBook}
        addButtonText="책 등록하기"
      />
    </>
  );
}