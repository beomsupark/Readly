import { useNavigate } from 'react-router-dom';
import logoutIcon from "../../assets/header/logout.png";

function LogoutButton({ textColor = "#878787", textSize = "base" }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');

    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    }

    navigate('/onboard');
  };

  return (
    <div className="flex">
      <img className="w-6 h-6 mr-3" src={logoutIcon} alt="logout" />
      <button 
        onClick={handleLogout} 
        className={`text-${textSize} font-bold text-[${textColor}]`}
      >
        로그아웃
      </button>
    </div>
  );
}

export default LogoutButton;