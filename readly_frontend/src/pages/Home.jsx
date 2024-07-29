import { useState, useCallback, useEffect } from 'react';
import Photocard from './Photocard/Photocard.jsx';
import Recommend from './Recommend/Recommend.jsx';
import BookModal from '../components/BookModal.jsx';
import useBookStore from '../store/bookStore';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { books, searchResults, loading, error, fetchBooks, searchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const openModal = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBook(null);
  };

  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      searchBooks(e.target.value);
    }
  }, [searchBooks]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    searchBooks(searchQuery);
  }, [searchQuery, searchBooks]);

  const handleSuggestionClick = useCallback((book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
    setSearchQuery("");
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="mt-1 ml-2 max-w-6xl mx-auto lg:px-1">
        <h2 className="font-bold text-xl mb-1">가장 <span className="text-custom-highlight">인기</span> 많은 <span className="text-custom-highlight">책</span></h2>
        <div className="grid grid-cols-2 mb-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1 pr-36">
          {books.map(book => (
            <div key={book.id} className="flex flex-col items-center">
              <img
                src={book.cover}
                alt={book.title}
                className="w-20 h-30 object-cover cursor-pointer"
                onClick={() => openModal(book)}
              />
            </div>
          ))}
        </div>
      </div>

      <Photocard photocards={[]} /> {/* Photocard 컴포넌트도 필요에 따라 수정 */}
      <Recommend />

      <BookModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        book={selectedBook}
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        suggestions={searchResults}
        handleSuggestionClick={handleSuggestionClick}
      />
    </>
  );
}