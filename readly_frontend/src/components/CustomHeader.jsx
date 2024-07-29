import { useState, useRef, useEffect } from 'react';
import searchIcon from '../assets/header/search.png';
import infoIcon from '../assets/header/info_img.png';
import BookModal from './BookModal';
import cloudImg from '../assets/header/cloudImg.png';

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

const fetchBooks = async (query) => {
  return [
    { id: 1, title: "해리 포터와 마법사의 돌" },
    { id: 2, title: "해리 포터와 비밀의 방" },
    { id: 3, title: "해리 포터와 아즈카반의 죄수" },
    { id: 4, title: "해리 포터와 불의 잔" },
    { id: 5, title: "해리 포터와 불사조 기사단" },
  ].filter(book => book.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
};

const fetchBookDetails = async (id) => {
  return {
    id,
    title: `책 제목 ${id}`,
    author: `작가 ${id}`,
    description: `책 ${id}에 대한 설명입니다.`,
    cover: 'https://via.placeholder.com/150',
    tags: ['태그1', '태그2', '태그3'],
  };
};

export default function CustomHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const getSuggestions = async () => {
      if (searchQuery.length > 0) {
        const results = await fetchBooks(searchQuery);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    getSuggestions();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]);
    const bookDetails = await fetchBookDetails(suggestion.id);
    setSelectedBook(bookDetails);
    setIsBookModalOpen(true);
    closeModal();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      const results = await fetchBooks(searchQuery);
      if (results.length > 0) {
        const bookDetails = await fetchBookDetails(results[0].id);
        setSelectedBook(bookDetails);
        setIsBookModalOpen(true);
        closeModal();
      }
    }
  };

  return (
    <header className="flex justify-between items-center py-1 px-3 ml-32 bg-white">
      <div className="flex-1 flex items-center">
        <img src={cloudImg} alt="클라우드" className="w-96 h-12 opacity-10" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="relative w-[20rem]">
          <input
            type="text"
            placeholder="검색할 책을 입력하세요"
            className="w-full px-3 py-1 pr-8 text-xs rounded-full border"
            onFocus={openModal}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onFocus={openModal}
          >
            <img src={searchIcon} alt="검색" className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center mr-6">
        <img src={infoIcon} alt="프로필" className="w-[3rem] h-6 rounded-lg mr-2" />
        <span className="text-base font-bold">닉네임</span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
          <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 relative" style={customModalStyles.content}>
            <div className="flex flex-col h-full">
              <div className="mb-4 relative ml-20 mr-20">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="검색할 책을 입력하세요"
                    className="w-full px-3 py-2 pr-8 text-sm rounded-full border"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <img src={searchIcon} alt="검색" className="w-5 h-5" />
                  </button>
                </form>
                {suggestions.length > 0 && (
                  <ul className="bg-[#F5F5F5] border rounded-lg shadow-lg mt-1 absolute z-10 w-full">
                    {suggestions.map((suggestion) => (
                      <>
                        <li
                          key={suggestion.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.title}
                        </li>
                        <div className="w-full pl-4 pr-4">
                          <div className="border border-custom-border w-full"></div>
                        </div>

                      </>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <BookModal
        isOpen={isBookModalOpen}
        onRequestClose={() => setIsBookModalOpen(false)}
        book={selectedBook}
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
    </header>
  );
}
