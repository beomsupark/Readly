import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/readly_logo.png';
import activity_icon from '../assets/toolbar/activity_icon.png';
import review_icon from '../assets/toolbar/review_icon.png';
import ranking_icon from '../assets/toolbar/ranking_icon.png';
import community_icon from '../assets/toolbar/community_icon.png';
import myPage_icon from '../assets/toolbar/myPage_icon.png';

const SidebarItem = ({ icon, alt, text, to, isLogo = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemClass = isLogo
    ? "w-full h-28 mb-4 flex items-center justify-center cursor-pointer group relative"
    : "w-full h-20 flex items-center justify-center cursor-pointer group relative";

  const imgClass = isLogo
    ? "w-20 h-20 transition-transform duration-100 group-hover:scale-125"
    : "w-16 h-16 transition-transform duration-100 group-hover:scale-125";

  return (
    <Link 
      to={to} 
      className={itemClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={icon} 
        alt={alt} 
        className={imgClass}
      />
      {isHovered && (
        <span className="absolute left-full ml-2 bg-white px-2 py-1 rounded shadow-md text-sm whitespace-nowrap z-10 font-bold">
          {text || alt}
        </span>
      )}
    </Link>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string,
  to: PropTypes.string.isRequired,
  isLogo: PropTypes.bool,
};

export default function CustomSidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-28 flex flex-col py-4 bg-[#E3F7FF] rounded-lg shadow-lg z-50">
      <SidebarItem icon={logo} alt="메인페이지" to="/" isLogo={true} />
      
      <div className="flex flex-col flex-grow w-full">
        <SidebarItem icon={activity_icon} alt="Activity" text="독서 활동" to="/activity" />
        <SidebarItem icon={review_icon} alt="Review" text="한줄평" to="/review" />
        <SidebarItem icon={ranking_icon} alt="Ranking" text="랭킹" to="/ranking" />
        <SidebarItem icon={community_icon} alt="Community" text="소모임" to="/community" />
      </div>
      
      <SidebarItem icon={myPage_icon} alt="My Page" text="마이페이지" to="/mypage" />
    </div>
  );
}