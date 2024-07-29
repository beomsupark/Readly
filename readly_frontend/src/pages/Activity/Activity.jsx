import { useState } from "react";
import ActivityProgress from "./ActivityProgress";
import ActivityChat from "./ActivityChat";
import ActivityRTC from "./ActivityRTC";
import ActivityBoard from "./ActivityBoard";

export default function Activity() {
  const [activeTab, setActiveTab] = useState('진행도');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['진행도', '소통', '화상', '회의록'];

  return (
    <>
      <h2>group1 소모임</h2>
      <div className="flex space-x-6">
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