import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import GoButton from "../components/GoButton/GoButton.jsx";
import aladinLogo from "../assets/onboard/aladinLogo.png";
import searchIcon from "../assets/header/search.png";
import tempImg from "../assets/onboard/card1_front.png";

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

export default function BookModal({
  isOpen,
  onRequestClose,
  book,
  searchQuery,
  handleInputChange,
  handleSearch,
  suggestions,
  handleSuggestionClick,
  clearSearch,
  onAddBook,
  addButtonText = "책 등록하기"
}) {
  const modalRef = useRef(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addBookStatus, setAddBookStatus] = useState(null);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onRequestClose]);

  const handleLocalInputChange = (e) => {
    const newValue = e.target.value;
    setLocalSearchQuery(newValue);
    handleInputChange(e);
    setShowSuggestions(newValue.trim() !== "");
  };

  const handleLocalSuggestionClick = (suggestion) => {
    console.log("선택된 책:", suggestion);  // 여기에 로그 추가
    handleSuggestionClick(suggestion);
    setLocalSearchQuery("");
    setShowSuggestions(false);
  };

  const handleAddBook = async () => {
    setAddBookStatus('loading');
    try {
      if (!book) {
        throw new Error('Book object is missing');
      }
      if (!book.bookId) {
        throw new Error('Book ID is missing');
      }
      await onAddBook(book);
      setAddBookStatus('success');
      onRequestClose();
    } catch (error) {
      console.error('Error adding book:', error);
      setAddBookStatus('error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div ref={modalRef} className="flex flex-col h-full">
        <SearchForm
          searchQuery={localSearchQuery}
          handleInputChange={handleLocalInputChange}
          handleSearch={handleSearch}
          suggestions={suggestions}
          handleSuggestionClick={handleLocalSuggestionClick}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />

        {book && (
          <>
            <div className="flex flex-col md:flex-row mt-2">
              <div className="w-32 h-40">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="md:w-3/4 md:pl-2 mt-2 md:mt-0">
                <h2 className="text-lg font-bold mb-1">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  작가: {book.author}
                </p>
                <p className="text-xs mb-2 max-h-16 overflow-y-auto">
                  {book.detail}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {book.tags &&
                    book.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 rounded-full px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="w-full my-4">
              <div className="border-b border-gray-300 w-full"></div>
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold text-xl mb-4">
                가장 <span className="text-custom-highlight">인기</span> 많은{" "}
                <span className="text-custom-highlight">콘텐츠</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                  <img
                    src={tempImg}
                    alt="포토카드"
                    className="w-48 h-64 object-cover mb-2 rounded-[20px]"
                  />
                  <button className="text-[#848484] px-4 py-2 rounded-full text-sm font-bold">
                    포토카드 더 보러가기
                  </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                  <img
                    src={tempImg}
                    alt="한줄평"
                    className="w-48 h-64 object-cover mb-2 rounded-[20px]"
                  />
                  <button className="text-[#848484] px-4 py-2 rounded-full text-sm font-bold">
                    한줄평 더 보러가기
                  </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col h-full justify-between items-end">
                  <div className="self-start w-full">
                    <h2 className="font-bold text-xl mb-4">
                      <span className="text-custom-highlight">구매</span>를
                      원하시나요?
                    </h2>
                    <div className="pr-8 flex justify-end">
                      <a
                        href={book.purchase_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block h-12 rounded-full overflow-hidden hover:opacity-80 transition-opacity duration-200"
                      >
                        <img
                          src={aladinLogo}
                          alt="알라딘으로 이동"
                          className="h-full w-auto object-contain"
                        />
                      </a>
                    </div>
                  </div>
                  <GoButton 
                    text={addBookStatus === 'loading' ? '등록 중...' : addButtonText} 
                    className="mt-4" 
                    onClick={handleAddBook}
                    disabled={addBookStatus === 'loading'}
                  />
                  {addBookStatus === 'success' && (
                    <p className="text-green-500 mt-2">책이 성공적으로 등록되었습니다.</p>
                  )}
                  {addBookStatus === 'error' && (
                    <p className="text-red-500 mt-2">책 등록에 실패했습니다. 다시 시도해주세요.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <button
          onClick={() => {
            onRequestClose();
            clearSearch();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
    </Modal>
  );
}

function SearchForm({
  searchQuery,
  handleInputChange,
  handleSearch,
  suggestions,
  handleSuggestionClick,
  showSuggestions,
  setShowSuggestions,
}) {
  return (
    <div className="mb-4 relative ml-20 mr-20">
      <form onSubmit={handleSearch} className="relative">
        <input
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
      {showSuggestions && searchQuery.trim() !== "" && suggestions.length > 0 && (
        <ul className="bg-[#F5F5F5] border rounded-lg shadow-lg mt-1 absolute z-10 w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.bookId}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleSuggestionClick(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion.title}
              <div className="border-b border-custom-border w-full"></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}