import searchIcon from '../assets/header/search.png'
import infoIcon from '../assets/header/info_img.png'

export default function CustomHeader(){
  return (
    <header className="flex justify-between items-center py-1 px-3 bg-white"> {/* 여기 수정 */}
      <div className="flex-1"></div>
      <div className="flex-1 flex justify-center">
        <div className="relative w-[20rem]"> {/* 여기 수정 */}
          <input
            type="text"
            placeholder="검색할 책을 입력하세요"
            className="w-full px-3 py-1 pr-8 text-xs rounded-full border"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2"> {/* 여기 수정 */}
            <img src={searchIcon} alt="검색" className="w-4 h-4" /> {/* 여기 수정 */}
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center mr-6"> {/* 여기 수정 */}
        <img src={infoIcon} alt="프로필" className="w-[3rem] h-6 rounded-lg mr-2" /> {/* 여기 수정 */}
        <span className="text-base font-bold">닉네임</span> {/* 여기 수정 */}
      </div>
    </header>
  )
}