import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "./store/userStore";
import Login from './pages/Login/Login.jsx';
import OnBoard from './pages/OnBoard.jsx';
import Home from './pages/Home.jsx';
import CustomSidebar from './components/CustomSidebar.jsx';
import CustomHeader from './components/CustomHeader.jsx';
import './App.css';
import MyPage from './pages/Mypage/MyPage.jsx';
import cloudImg from './assets/background/cloud.png';
import MakeCard from './pages/Photocard/MakeCard.jsx';
import SharedBoard from './pages/SharedBoard/SharedBoard.jsx';
import EditProfile from './pages/Mypage/EditProfile.jsx';
import Ranking from './pages/Ranking/Ranking.jsx';
import Community from './pages/Community/Community.jsx';
import MakeCommunity from './pages/Community/MakeCommunity.jsx';
import Activity from './pages/Activity/Activity.jsx';

function App() {
  const location = useLocation();
  const isFullScreenPage = ["/login", "/"].includes(location.pathname);
  const notSearchPage =
    ["/login", "/", "/mypage", "/edit"].includes(location.pathname) ||
    /^\/activity(\/.*)?$/.test(location.pathname);
  const showCloud = !["/login", "/"].includes(location.pathname);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/community" ||
      location.pathname === "/mypage"
    ) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, [setUser]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {!notSearchPage && <CustomHeader />}
      <div className="flex relative min-h-screen">
        {!isFullScreenPage && <CustomSidebar />}
        <main className={`flex-1 ${!isFullScreenPage ? "ml-28" : ""}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<OnBoard />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/sharedboard" element={<SharedBoard />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/makecard" element={<MakeCard />} />
              <Route path="/update" element={<UpdateProfile />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/community" element={<Community />} />
              <Route path="/makecommunity" element={<MakeCommunity />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/activity/:groupId" element={<Activity />} />
              {/* 다른 라우트들... */}
            </Route>
          </Routes>
        </main>
        {showCloud && (
          <div className="fixed right-0 bottom-0 overflow-hidden pointer-events-none z-0">
            <img
              src={cloudImg}
              alt="Background cloud"
              className="w-48 h-48 object-cover translate-x-1/6 translate-y-1/3"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
