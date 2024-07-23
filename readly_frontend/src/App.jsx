import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import OnBoard from './pages/OnBoard.jsx'
import Home from './pages/Home.jsx'
import CustomSidebar from './components/CustomSidebar.jsx'
import './App.css'

function App() {
  const location = useLocation();
  const isFullScreenPage = ['/login', '/onboard'].includes(location.pathname);

  return (
    <div className="flex">
      {!isFullScreenPage && <CustomSidebar />}
      <main className={`flex-1 ${!isFullScreenPage ? 'ml-28' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/onboard' element={<OnBoard />} />
          
          <Route path="/" element={<Home />} />
          {/* <Route path="/activity" element={<Activity />} /> */}
          {/* <Route path="/review" element={<Review />} /> */}
          {/* <Route path="/ranking" element={<Ranking />} /> */}
          {/* <Route path="/community" element={<Community />} /> */}
          {/* <Route path="/mypage" element={<MyPage />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
