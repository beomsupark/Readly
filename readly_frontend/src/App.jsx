import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import OnBoard from './pages/OnBoard.jsx'
import Home from './pages/Home.jsx'
import CustomSidebar from './components/CustomSidebar.jsx'
import CustomHeader from './components/CustomHeader.jsx'
import './App.css'
import MyPage from './pages/MyPage.jsx'
import cloudImg from './assets/background/cloud.png'
import MakeCard from './pages/Photocard/MakeCard.jsx'
function App() {
  const location = useLocation();
  const isFullScreenPage = ['/login', '/onboard'].includes(location.pathname);
  const notSaerchPage = ['/login', '/onboard', '/mypage'].includes(location.pathname);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {!notSaerchPage && <CustomHeader />}
      <div className="flex relative min-h-screen">
        {!isFullScreenPage && <CustomSidebar />}
        <main className={`flex-1 ${!isFullScreenPage ? 'ml-28' : ''}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/onboard' element={<OnBoard />} />

            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/makecard" element={<MakeCard/>}/>
            {/* 다른 라우트들... */}
          </Routes>
        </main>
        <div className="fixed right-0 bottom-0 overflow-hidden pointer-events-none z-0">
          <img
            src={cloudImg}
            alt="Background cloud"
            className="w-48 h-48 object-cover translate-x-1/6 translate-y-1/3"
          />
        </div>
      </div>
    </div>
  )
}

export default App
