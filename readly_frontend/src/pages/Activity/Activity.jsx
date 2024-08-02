import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivityProgress from "./ActivityProgress";
import ActivityChat from "./ActivityChat";
import ActivityRTC from "./ActivityRTC";
import ActivityBoard from "./ActivityBoard";
import ActivityHeader from "./ActivityHeader";
import groupData from "./groupdata";

const groupList = [
  { id: 1, title: "셜록홈즈 책 같이 보면서 회의 할 소모임" },
  { id: 2, title: "group2" },
];

export default function Activity() {
  const { groupId } = useParams(); // URL에서 groupId를 가져옵니다
  const [activeTab, setActiveTab] = useState('진행도');
  const [isGroupListOpen, setIsGroupListOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(parseInt(groupId) || 1);
  const [selectedGroupData, setSelectedGroupData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['진행도', '소통', '화상', '회의록'];

  useEffect(() => {
    const currentGroupId = parseInt(groupId) || 1;
    setSelectedGroupId(currentGroupId);
    setSelectedGroupData(groupData[currentGroupId]);
    setSelectedGroup(groupList.find(group => group.id === currentGroupId));
  }, [groupId]);

  useEffect(() => {
    console.log("Activity: selectedGroupData updated", selectedGroupData);
  }, [selectedGroupData]);

  if (!selectedGroupData) {
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
        {activeTab === "진행도" && <ActivityProgress groupData={selectedGroupData} />}
        {activeTab === "소통" && <ActivityChat groupData={selectedGroupData} />}
        {activeTab === "화상" && <ActivityRTC groupData={selectedGroupData} />}
        {activeTab === "회의록" && <ActivityBoard groupData={selectedGroupData} />}
      </div>
    </>
  )
}