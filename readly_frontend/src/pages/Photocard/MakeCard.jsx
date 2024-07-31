import { useState, useCallback, useEffect } from "react";
import CustomRadioButton from "../../components/RadioButton/CustomRadioButton.jsx";
import "../../components/RadioButton/CustomRadioButton.css";
import GoButton from "../../components/GoButton/GoButton.jsx";
import FormField from "../../components/Form/FormField.jsx";
import AutoCompleteWrapper from "../../components/Form/AutoCompleteWrapper.jsx";
import Logo from "../../assets/logo/readly_logo.png";
import useBookStore from "../../store/bookStore";
import usePhotocardStore from "../../store/photocardStore";
import { createPhotoCard } from "../../api/photocardAPI";

const TEMP_USER_ID = "1";
const TEMP_BOOK_ID = 1;
const TEMP_VISIBILITY = 'A'
export default function MakeCard() {
  const [bookInfo, setBookInfo] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [quote, setQuote] = useState("");
  const [visibility, setVisibility] = useState("A");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { searchResults, searchBooks, loading } = useBookStore();
  const {
    isLoading: isCreatingPhotocard,
    setPhotoCard,
    photoCard,
  } = usePhotocardStore();

  useEffect(() => {
    if (bookInfo.trim() !== "") {
      searchBooks(bookInfo);
    }
  }, [bookInfo, searchBooks]);

  const handleBookInfoChange = useCallback((e) => {
    const value = e.target.value;
    setBookInfo(value);
    setShowSuggestions(value.trim() !== "");
    setSelectedBook(null); // 입력값이 변경되면 선택된 책 초기화
  }, []);

  const handleSuggestionClick = useCallback((book) => {
    console.log("Selected book:", book);
    setBookInfo(book.title);
    setSelectedBook(book);
    setShowSuggestions(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook) {
      alert("책을 입력해주세요.");
      return;
    }
    if (!quote.trim()) {
      alert("글귀를 입력해주세요.");
      return;
    }

    console.log("Submitting data:", {
      bookId: TEMP_BOOK_ID,
      text: quote,
      visibility: TEMP_VISIBILITY,
      memberId: TEMP_USER_ID,
    });

    try {
      const result = await createPhotoCard(
        TEMP_BOOK_ID,
        quote,
        TEMP_VISIBILITY,
        TEMP_USER_ID
      );
      console.log("Received response:", result);
      setPhotoCard(result);
      setBookInfo("");
      setSelectedBook(null);
      setQuote("");
      setVisibility("공개");
    } catch (err) {
      console.error("포토카드 생성 중 오류 발생:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      alert("포토카드 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex w-full h-4/5">
      <div className="w-2/5 p-4 mt-10 bg-[#F5F5F5] rounded-xl shadow-md relative">
        <form onSubmit={handleSubmit} className="space-y-12 font-bold">
          <AutoCompleteWrapper
            label="책 이름을 입력해주세요"
            value={bookInfo}
            onChange={handleBookInfoChange}
            suggestions={searchResults}
            onSuggestionClick={handleSuggestionClick}
            showSuggestions={showSuggestions && !loading}
          />
          <FormField
            label="글귀를 입력해주세요"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            multiline={true}
          />
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">
              공개 범위
            </label>
            <div className="flex justify-start">
              <CustomRadioButton
                options={[
                  { value: "A", label: "공개" },
                  { value: "E", label: "비공개" }
                ]}
                selectedOption={visibility}
                onChange={setVisibility}
              />
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <GoButton
              text="포토카드 제작"
              onClick={handleSubmit}
              disabled={isCreatingPhotocard}
            />
          </div>
        </form>
      </div>
      <div className="w-3/5 flex items-center justify-center">
        {isCreatingPhotocard ? (
          <div className="animate-bounce">
            <img src={Logo} alt="Loading" className="w-48 h-48" />
            <p className="text-center text-custom-highlight mt-2 text-2xl">
              Loading ....
            </p>
          </div>
        ) : photoCard ? (
          <div className="flex-grow grid grid-cols-2 gap-4">
            {photoCard.images.map((image, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                <img
                  src={image.url}
                  alt={`Generated image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
            <p>PhotoCard ID: {photoCard.photoCardId}</p>
          </div>
        ) : (
          <p className="text-xl text-[#7a7a7a] text-bold">
            포토카드가 여기에 나타납니다
          </p>
        )}
      </div>
    </div>
  );
}
