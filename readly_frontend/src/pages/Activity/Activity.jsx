import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActivityProgress from "./ActivityProgress";
import ActivityChat from "./ActivityChat";
import ActivityRTC from "./ActivityRTC";
import ActivityBoard from "./ActivityBoard";
import ActivityHeader from "./ActivityHeader";
import useUserStore from "../../store/userStore";
import useGroupStore from "../../store/groupStore";
import axios from 'axios';
import { GroupDelete, GroupLeave } from './DeleteGroup.jsx';

export default function Activity() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('진행도');
  const [isGroupListOpen, setIsGroupListOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  const { user, token } = useUserStore();
  const { 
    groups, 
    selectedGroupId, 
    loading, 
    error, 
    fetchGroups, 
    selectGroup, 
    getSelectedGroup 
  } = useGroupStore();

  useEffect(() => {
    if (user && user.id) {
      fetchGroups(user.id, token);
    }
  }, [user, token, fetchGroups]);

  useEffect(() => {
    if (groups.length > 0) {
      const urlGroupId = parseInt(groupId);
      
      if (!groupId) {
        const firstGroupId = groups[0].groupId;
        selectGroup(firstGroupId);
        navigate(`/activity/${firstGroupId}`, { replace: true });
      } else if (groups.some(group => group.groupId === urlGroupId)) {
        selectGroup(urlGroupId);
      } else {
        alert("해당 그룹에 속해있지 않습니다!");
        const firstGroupId = groups[0].groupId;
        selectGroup(firstGroupId);
        navigate(`/activity/${firstGroupId}`, { replace: true });
      }
    }
  }, [groups, groupId, navigate, selectGroup]);

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!selectedGroupId) return;

      try {
        const response = await axios.get(`https://i11c207.p.ssafy.io/api/group/read-books/${selectedGroupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userInfo = response.data.readBooks.find(book => book.member_id === user.id);
        if (userInfo) {
          setUserRole(userInfo.member_info.roles);
        }
      } catch (error) {
        console.error("Failed to fetch group data:", error);
      }
    };

    fetchGroupData();
  }, [selectedGroupId, user.id, token]);

  const getTabs = useMemo(() => {
    const baseTabs = ['진행도', '소통', '화상', '게시판'];
    if (userRole === 'L') {
      return [...baseTabs, '그룹 삭제'];
    } else if (userRole === 'M') {
      return [...baseTabs, '그룹 탈퇴'];
    }
    return baseTabs;
  }, [userRole]);

  const handleDeleteSuccess = () => {
    fetchGroups(user.id, token);
  };

  const handleLeaveSuccess = () => {
    fetchGroups(user.id, token);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const selectedGroup = getSelectedGroup();

  return (
    <>
      {isGroupListOpen && (
        <div 
          className="fixed inset-0 bg-[#000000] bg-opacity-50 z-30" 
          onClick={() => setIsGroupListOpen(false)}
        ></div>
      )}
      <div className="-ml-[7rem]">
        <ActivityHeader 
          isGroupListOpen={isGroupListOpen} 
          setIsGroupListOpen={setIsGroupListOpen} 
          setSelectedGroupId={selectGroup}
          selectedGroupId={selectedGroupId}
          selectedGroup={selectedGroup}
          groupList={groups}
        />
      </div>
      <div className="flex space-x-6 mt-3">
        {getTabs.map((tab) => (
          <button
            key={tab}
            className={`font-bold text-2xl ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "진행도" && <ActivityProgress groupId={selectedGroupId} />}
        {activeTab === "소통" && <ActivityChat groupId={selectedGroupId} />}
        {activeTab === "화상" && <ActivityRTC groupId={selectedGroupId} isActiveTab={activeTab === "화상"} />}
        {activeTab === "게시판" && <ActivityBoard groupId={selectedGroupId} />}
        {activeTab === "그룹 삭제" && userRole === 'L' && (
          <GroupDelete 
            groupId={selectedGroupId} 
            token={token} 
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
        {activeTab === "그룹 탈퇴" && userRole === 'M' && (
          <GroupLeave 
            groupId={selectedGroupId} 
            userId={user.id} 
            token={token} 
            onLeaveSuccess={handleLeaveSuccess}
          />
        )}
      </div>
    </>
  );
}