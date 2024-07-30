import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import GoButton from "../../components/GoButton/GoButton.jsx";
import FormField from "../../components/Form/FormField.jsx";
import normal from "../../assets/emoji/normal.png";
import joyful from "../../assets/emoji/joy.png";
import tired from "../../assets/emoji/tired.png";
import sad from "../../assets/emoji/sad.png";
import angry from "../../assets/emoji/angry.png";
import happy from "../../assets/emoji/happy.png";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [eventText, setEventText] = useState("");

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

    try {
      const response = await axios.post("/api/recommend", {
        emotion: selectedEmotion,
        event: eventText,
      });
      console.log("서버 응답:", response.data);
      // 여기에 응답 처리 로직을 추가하세요 (예: 추천 결과 표시)
      setModalIsOpen(false); // 모달 닫기
    } catch (error) {
      console.error("에러 발생:", error);
      alert("추천을 받는 데 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const Book = {
    title: "코끼리의 마음",
    description:
      "매일 나무에 오르고 떨어지는 코끼리를 통해 각자 다른 삶의 방식과 태도에 대해 이야기하는 동화 소설. 2017년에 출간되어 국내 독자들에게 큰 사랑을 받은 .책 제목. 의 작가 톤 텔레헨의 두 번째 어른 동화 소설이다.",
    author: "톤 텔레헨",
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

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  return (
    <>
      <div className="ml-3 mb-6 lg:px-4">
        <h2 className="font-bold text-2xl">
          <span>리들리</span> <span className="text-custom-highlight">AI</span>
          가 <span className="text-custom-highlight">추천</span>하는{" "}
          <span className="text-custom-highlight">책</span>
        </h2>
      </div>
      <div className="mt-4 mx-auto max-w-5xl lg:px-6">
        <div className="flex bg-[#F1EFEF] p-6 rounded-lg shadow-md w-full px-6">
          <div className="w-1/4 pr-6">
            <img
              src="/path-to-your-image.png"
              alt="Book Cover"
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="w-3/4 pl-6">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl">{Book.title}</h3>
                  <button
                    onClick={openModal}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <span className="text-sm text-[#868686] -mt-5 font-bold">
                      다른 책을 원하시나요?{" "}
                    </span>
                    <span className="text-xl text-custom-highlight -mt-5 ml-2">
                      &gt;
                    </span>
                  </button>
                </div>
                <p className="text-lg mb-2">{Book.author}</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {Book.description}
                </p>
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

          <div className="flex justify-between items-start w-full mt-12">
            <div className="w-1/2 pr-12 flex flex-col items-center">
              <h3 className="text-xl mb-8 text-center font-bold">
                <span className="text-custom-highlight">오늘</span> 느꼈던{" "}
                <span className="text-custom-highlight">감정</span>을 골라주세요
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
                {" "}
                <GoButton
                  text="AI에게 추천받기"
                  className="w-auto px-4 py-2 text-sm"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
