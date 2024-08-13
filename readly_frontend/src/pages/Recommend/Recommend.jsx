import { useState, useEffect } from "react";
import useUserStore from "../../store/userStore.js";
import Modal from "react-modal";
import axios from "axios";
import GoButton from "../../components/GoButton/GoButton.jsx";
import FormField from "../../components/Form/FormField.jsx";
import Logo from "../../assets/logo/readly_logo.png";
import normal from "../../assets/emoji/normal.png";
import joyful from "../../assets/emoji/joy.png";
import tired from "../../assets/emoji/tired.png";
import sad from "../../assets/emoji/sad.png";
import angry from "../../assets/emoji/angry.png";
import happy from "../../assets/emoji/happy.png";
import aladinLogo from "../../assets/onboard/aladinLogo.png";

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



export default function Recommend() {
  const BASE_URL = "https://i11c207.p.ssafy.io/api/";
  // const BASE_URL = "http://localhost:8080/api/";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [eventText, setEventText] = useState("");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendedBookIds, setRecommendedBookIds] = useState([]);
  const token = useUserStore(state => state.token);


  useEffect(() => {
    fetchInitialRecommendation(token);
  }, [token]);

  const fetchInitialRecommendation = async (token) => {
    console.log(`Attempting to fetch initial book recommendation.`);
    try {
      const response = await axios.get(`${BASE_URL}book/firstRecommand`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Full API response:', response);
      
      if (response.data && response.data.book) {
        setBook(response.data.book);
      } else {
        console.error("Unexpected response format:", response.data);
        // setError("책 정보를 가져오는데 실패했습니다.");
      }
      
      return response.status;
    } catch (error) {
      console.error('Error fetching initial book recommendation:', 
                    error.response ? error.response.data : error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
      // setError("초기 추천을 불러오는데 실패했습니다. 나중에 다시 시도해주세요.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleEventTextChange = (e) => {
    setEventText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedEmotion) {
      alert("감정을 선택해주세요.");
      return;
    }
  
    setLoading(true);
  
    try {
      const query = `오늘은 ${selectedEmotion} 감정을 느꼈고, ${eventText}`;
  
      const aiResponse = await axios.post(
        "https://i11c207.p.ssafy.io/ai/recommand",
        {
          query: query,
        }
      );
  
      console.log("AI 추천 응답:", aiResponse.data);
      setRecommendedBookIds(aiResponse.data.bar);
  
      if (aiResponse.data.bar.length > 0) {
        const firstBookId = aiResponse.data.bar[0];
        const bookResponse = await axios.get(`${BASE_URL}book/${firstBookId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (bookResponse.data && bookResponse.data.book) {
          setBook(bookResponse.data.book);
        } else {
          console.error("Unexpected book response format:", bookResponse.data);
        }
      }
  
      setModalIsOpen(false);
    } catch (error) {
      console.error("에러 발생:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
      alert("추천을 받는 데 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const emotions = [
    { text: "평범해요", emoji: normal },
    { text: "기뻐요", emoji: joyful },
    { text: "피곤해요", emoji: tired },
    { text: "슬퍼요", emoji: sad },
    { text: "화나요", emoji: angry },
    { text: "행복해요", emoji: happy },
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="ml-3 mb-2 lg:px-4">
        <h2 className="font-bold text-2xl">
          <span>리들리</span> <span className="text-custom-highlight">AI</span>
          가 <span className="text-custom-highlight">추천</span>하는{" "}
          <span className="text-custom-highlight">책</span>
        </h2>
      </div>
      <div className="mx-auto max-w-5xl lg:px-6">
        <div className="flex bg-[#F1EFEF] p-6 rounded-lg shadow-md w-full px-6">
          <div className="w-1/4 pr-6">
            <img
              src={book?.image}
              alt="Book Cover"
              className="w-full h-[13rem] rounded-md"
            />
          </div>
          <div className="w-3/4 pl-6">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl">{book?.title}</h3>
                  <button
                    onClick={openModal}
                    className="flex items-center text-blue-500"
                  >
                    <span className="text-sm text-[#868686] font-bold hover:underline">
                      다른 책을 원하시나요?{" "}
                    </span>
                    <span className="text-xl text-custom-highlight ml-2">
                      &gt;
                    </span>
                  </button>
                </div>
                <p className="text-lg mb-2">{book?.author}</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {book?.detail}
                </p>
                <div className="flex justify-end rounded-full">
                  <a
                    href={book?.purchase_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block h-12 hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src={aladinLogo}
                      alt="알라딘으로 이동"
                      className="h-full w-auto object-contain rounded-full"
                      style={{
                        filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.3))",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        contentLabel="다른 책 추천"
      >
        <div className="flex flex-col h-full w-full mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="font-bold text-2xl">
              <span className="text-black">리들리</span>{" "}
              <span className="text-custom-highlight">AI</span>가{" "}
              <span className="text-custom-highlight">추천</span>하는{" "}
              <span className="text-custom-highlight">책</span>
            </h2>
            <button
              onClick={() => setModalIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {loading ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="animate-bounce">
                <img src={Logo} alt="Loading" className="w-48 h-48" />
                <p className="text-center text-custom-highlight mt-2 text-2xl">
                  Loading ....
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start w-full mt-12">
              <div className="w-1/2 pr-12 flex flex-col items-center">
                <h3 className="text-xl mb-8 text-center font-bold">
                  <span className="text-custom-highlight">오늘</span> 느꼈던{" "}
                  <span className="text-custom-highlight">감정</span>을
                  골라주세요
                </h3>
                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                  {emotions.map((emotion, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center ${
                        selectedEmotion === emotion.text
                          ? "ring-2 ring-blue-500 rounded-lg"
                          : ""
                      }`}
                      onClick={() => handleEmotionSelect(emotion.text)}
                    >
                      <img
                        src={emotion.emoji}
                        alt={emotion.text}
                        className="w-16 h-16 mb-2"
                      />
                      <span className="text-sm font-bold text-[#868686]">
                        {emotion.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-1/2 pl-12 flex flex-col">
                <h3 className="text-md mb-8 font-bold text-[#767676]">
                  오늘 어떤 일이 있으셨나요?
                </h3>
                <FormField
                  label="있었던 일을 알려주세요"
                  value={eventText}
                  onChange={handleEventTextChange}
                  multiline={true}
                />
                <div className="flex justify-end">
                  <GoButton
                    text="AI에게 추천받기"
                    className="w-auto px-4 py-2 text-sm"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
