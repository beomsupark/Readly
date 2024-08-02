import { useState, useCallback, useEffect, useRef } from "react";
import Modal from "react-modal";
import searchIcon from "../assets/header/search.png";
import useBookStore from "../store/bookStore";
import BookModal from "./BookModal";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: "10",
  },
  content: {
    width: "90%",
    maxWidth: "800px",
    height: "90vh",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#F5F5F5",
    overflow: "auto",
  },
};

export default function Search({ isOpen, onRequestClose, onBookSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const { searchResults, searchBooks } = useBookStore();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      setShowSuggestions(value.trim() !== "");
      if (value) {
        searchBooks(value);
      } else {
        useBookStore.getState().setSearchResults([]);
      }
    },
    [searchBooks]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery) {
        searchBooks(searchQuery);
      }
    },
    [searchQuery, searchBooks]
  );

  const handleSuggestionClick = useCallback((book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
    setShowSuggestions(false);
  }, []);

  const handleBookRegister = useCallback((book) => {
    onBookSelect(book);
    setIsBookModalOpen(false);
    onRequestClose();
  }, [onBookSelect, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="Search Modal"
    >
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg p-6 relative"
          style={customModalStyles.content}
        >
          <div className="flex flex-col h-full">
            <div className="mb-4 relative ml-20 mr-20">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="검색할 책을 입력하세요"
                  className="w-full px-3 py-2 pr-8 text-sm rounded-full border"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <img src={searchIcon} alt="검색" className="w-5 h-5" />
                </button>
              </form>
              {showSuggestions &&
                searchQuery.trim() !== "" &&
                searchResults.length > 0 && (
                  <ul className="bg-[#F5F5F5] border rounded-lg shadow-lg mt-1 absolute z-10 w-full">
                    {searchResults.map((book) => (
                      <li
                        key={book.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(book)}
                      >
                        {book.title}
                        <div className="border-b border-custom-border w-full"></div>
                      </li>
                    ))}
                  </ul>
                )}
            </div>

            <button
              onClick={onRequestClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      </div>
      
      {selectedBook && (
        <BookModal
          isOpen={isBookModalOpen}
          onRequestClose={() => setIsBookModalOpen(false)}
          book={selectedBook}
          onRegisterBook={handleBookRegister}
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          suggestions={searchResults}
          handleSuggestionClick={handleSuggestionClick}
          clearSearch={() => setSearchQuery("")}
        />
      )}
    </Modal>
  );
}