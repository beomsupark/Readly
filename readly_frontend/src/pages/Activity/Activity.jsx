import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ActivityProgress from "./ActivityProgress";
import ActivityChat from "./ActivityChat";
import ActivityRTC from "./ActivityRTC";
import ActivityBoard from "./ActivityBoard";
import ActivityHeader from "./ActivityHeader";
import { getMemberGroups } from "../../api/communityAPI";
import useUserStore from "../../store/userStore";

export default function Activity() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('진행도');
  const [isGroupListOpen, setIsGroupListOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { user, token } = useUserStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['진행도', '소통', '화상', '회의록'];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (!user || !user.id) {
          console.error("User information not found");
          // 로그인 페이지로 리다이렉트 또는 에러 처리
          return;
        }

        const groups = await getMemberGroups(user.id, token);
        setGroupList(groups);
        
        if (groups.length > 0) {
          const initialGroupId = parseInt(groupId) || groups[0].groupId;
          setSelectedGroupId(initialGroupId);
          setSelectedGroup(groups.find(group => group.groupId === initialGroupId));
          if (!groupId) {
            navigate(`/activity/${initialGroupId}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, [groupId, navigate, user, token]);

  useEffect(() => {
    if (groupList.length > 0 && selectedGroupId) {
      setSelectedGroup(groupList.find(group => group.groupId === selectedGroupId));
    }
  }, [selectedGroupId, groupList]);

  if (!selectedGroup) {
    return <div>Loading...</div>;
  }

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
          setSelectedGroupId={setSelectedGroupId}
          selectedGroupId={selectedGroupId}
          selectedGroup={selectedGroup}
          groupList={groupList}
        />
      </div>
      <div className="flex space-x-6 mt-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`font-bold text-2xl ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-[#B5B5B5]"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "진행도" && <ActivityProgress groupId={selectedGroupId} />}
        {activeTab === "소통" && <ActivityChat groupId={selectedGroupId} />}
        {activeTab === "화상" && <ActivityRTC groupId={selectedGroupId} />}
        {activeTab === "회의록" && <ActivityBoard groupId={selectedGroupId} />}
      </div>
    </>
  )
}