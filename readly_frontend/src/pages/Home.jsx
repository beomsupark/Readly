import { useState, useCallback } from 'react';
import Photocard from './Photocard/Photocard.jsx';
import Recommend from './Recommend/Recommend.jsx';
import BookModal from '../components/BookModal.jsx';

import book1 from '../assets/onboard/book.jpg';
import CardImg1 from '../assets/onboard/card1_front.png';
import CardImg1_back from '../assets/onboard/card1_back.png';
import CardImg2 from '../assets/onboard/card2.png';
import CardImg3 from '../assets/onboard/card3.png';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dummyBooks = [
    { id: 1, title: '책 제목 1', cover: book1 },
    { id: 2, title: '책 제목 2', cover: book1 },
    { id: 3, title: '책 제목 3', cover: book1 },
    { id: 4, title: '책 제목 4', cover: book1 },
    { id: 5, title: '책 제목 5', cover: book1 },
    { id: 6, title: '책 제목 6', cover: book1 },
    { id: 7, title: '책 제목 7', cover: book1 },
    { id: 8, title: '책 제목 8', cover: book1 },
  ];

  const dummyPhotocards = [
    { id: 1, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
    { id: 2, title: '책 제목 1', cover: CardImg2, back: CardImg1_back },
    { id: 3, title: '책 제목 1', cover: CardImg3, back: CardImg1_back },
    { id: 4, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
    { id: 5, title: '책 제목 1', cover: CardImg2, back: CardImg1_back },
    { id: 6, title: '책 제목 1', cover: CardImg3, back: CardImg1_back },
    { id: 7, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
    { id: 8, title: '책 제목 1', cover: CardImg2, back: CardImg1_back },
    { id: 9, title: '책 제목 1', cover: CardImg3, back: CardImg1_back },
    { id: 10, title: '책 제목 1', cover: CardImg1, back: CardImg1_back },
  ];

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
    // Here you would typically call an API to get suggestions
    // For now, we'll just filter the dummy books
    const filteredSuggestions = dummyBooks.filter(book => 
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  }, [searchQuery]);

  const handleSuggestionClick = useCallback((book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
    setSearchQuery("");
    setSuggestions([]);
  }, []);

  return (
    <>
      <div className="mt-1 ml-3 max-w-7xl mx-auto lg:px-2">
        {/* 베스트 셀러 섹션 */}
        <h2 className="font-bold text-2xl mb-2">가장 <span className="text-custom-highlight">인기</span> 많은 <span className="text-custom-highlight">책</span></h2>
        <div className="grid grid-cols-2 mb-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 pr-48">
          {dummyBooks.map(book => (
            <div key={book.id} className="flex flex-col items-center">
              <img
                src={book.cover}
                alt={book.title}
                className="w-24 h-36 object-cover cursor-pointer"
                onClick={() => openModal(book)}
              />
            </div>
          ))}
        </div>
      </div>

      <Photocard photocards={dummyPhotocards} />
      <Recommend />

      <BookModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        book={selectedBook}
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
    </>
  );
}