import { useState } from 'react';
import CustomRadioButton from '../../components/RadioButton/CustomRadioButton.jsx'
import '../../components/RadioButton/CustomRadioButton.css'
import GoButton from '../../components/GoButton/GoButton.jsx';
import FormField from '../../components/Form/FormField.jsx';
import Logo from '../../assets/logo/readly_logo.png'

export default function MakeCard(){
  const [bookInfo, setBookInfo] = useState('');
  const [quote, setQuote] = useState('');
  const [visibility, setVisibility] = useState('공개');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // POST 요청 대신 console.log 사용
    console.log('Form submitted with:', { bookInfo, quote, visibility });

    // 로딩 애니메이션을 테스트하기 위한 지연
    setTimeout(() => {
      setIsLoading(false);
      setBookInfo('');
      setQuote('');
      setVisibility('공개');
    }, 3000); // 3초 후 로딩 종료
  };

  return (
    <div className="flex w-full h-4/5">
      <div className="w-2/5 p-4 mt-10 bg-[#F5F5F5] rounded-xl shadow-md relative">
        <form onSubmit={handleSubmit} className="space-y-12">
          <FormField
            label="책 이름을 입력해주세요"
            value={bookInfo}
            onChange={(e) => setBookInfo(e.target.value)}
          />
          <FormField
            label="글귀를 입력해주세요"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            multiline={true}
          />
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">공개 범위</label>
            <div className="flex justify-start">
              <CustomRadioButton
                options={['공개', '비공개']}
                selectedOption={visibility}
                onChange={setVisibility}
              />
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <GoButton text="포토카드 제작" onClick={handleSubmit} disabled={isLoading} />
          </div>
        </form>
      </div>
      <div className="w-3/5 flex items-center justify-center">
        {isLoading ? (
          <div className="animate-bounce">
            <img src={Logo} alt="Loading" className="w-48 h-48" />
            <p className="text-center text-custom-highlight mt-2 text-2xl">Loading ....</p>
          </div>
        ) : (
          <p className="text-xl text-[#7a7a7a] text-bold">포토카드가 여기에 나타납니다</p>
        )}
      </div>
    </div>
  );
}