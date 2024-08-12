import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMemberGroups } from "../../api/communityAPI.js";
import useUserStore from "../../store/userStore.js";

const ActivityRedirect = () => {
  const navigate = useNavigate();
  const { user, token } = useUserStore();

  useEffect(() => {
    const redirectToFirstGroup = async () => {
      try {
        if (!user || !user.id) {
          console.error("User information not found");
          return;
        }

        const groups = await getMemberGroups(user.id, token);
        
        if (groups.length > 0) {
          const firstGroupId = groups[0].groupId;
          navigate(`/activity/${firstGroupId}`);
        } else {
          alert("속한 그룹이 없습니다. 그룹을 먼저 생성하거나 참여해주세요.");
          navigate('/community'); // 또는 다른 적절한 페이지로 리다이렉트
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        alert("그룹 정보를 불러오는데 실패했습니다.");
        navigate('/home'); // 오류 발생 시 홈페이지로 리다이렉트
      }
    };

    redirectToFirstGroup();
  }, [navigate, user, token]);

  return <div>Redirecting...</div>; // 로딩 중 표시
};

export default ActivityRedirect;