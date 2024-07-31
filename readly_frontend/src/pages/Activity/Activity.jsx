import { useState } from "react";
import ActivityProgress from "./ActivityProgress";
import ActivityChat from "./ActivityChat";
import ActivityRTC from "./ActivityRTC";
import ActivityBoard from "./ActivityBoard";
import ActivityHeader from "./ActivityHeader";

export default function Activity() {
  const [activeTab, setActiveTab] = useState('진행도');
  const [isGroupListOpen, setIsGroupListOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['진행도', '소통', '화상', '회의록'];

  return (
    <>
      {isGroupListOpen && (
        <div 
          className="fixed inset-0 bg-[#000000] bg-opacity-50 z-30" 
          onClick={() => setIsGroupListOpen(false)}
        ></div>
      )}
      <div className="-ml-[7rem]">
        <ActivityHeader isGroupListOpen={isGroupListOpen} setIsGroupListOpen={setIsGroupListOpen} />
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
        {activeTab === "진행도" && <ActivityProgress />}
        {activeTab === "소통" && <ActivityChat />}
        {activeTab === "화상" && <ActivityRTC />}
        {activeTab === "회의록" && <ActivityBoard />}
      </div>
    </>
  )
}