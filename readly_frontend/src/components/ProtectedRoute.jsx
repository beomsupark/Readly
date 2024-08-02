// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = () => {
  const user = useUserStore(state => state.user);

  if (!user) {
    // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 사용자가 로그인한 경우 자식 라우트를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;