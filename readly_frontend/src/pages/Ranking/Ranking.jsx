import { useEffect } from "react";
import { create } from "zustand";
import { fetchPersonalRanking, fetchGroupRanking } from "../api/rankingAPI";
import CrownImg from "../assets/level/crown.png";
import InfoImg from "../assets/header/info_img.png";
import GroupImg from "../assets/header/group_img.png";
import PersonalRanking from "./PersonalRanking";
import GroupRanking from "./GroupRanking";

const useRankStore = create((set) => ({
  personalRanking: [],
  groupRanking: [],
  setPersonalRanking: (data) => set({ personalRanking: Array.isArray(data) ? data : [] }),
  setGroupRanking: (data) => set({ groupRanking: Array.isArray(data) ? data : [] }),
}));

export default function Ranking() {
  const { personalRanking, groupRanking, setPersonalRanking, setGroupRanking } = useRankStore();

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const [personalData, groupData] = await Promise.all([
          fetchPersonalRanking(),
          fetchGroupRanking(),
        ]);
        setPersonalRanking(personalData);
        setGroupRanking(groupData);
      } catch (error) {
        console.error("Error fetching rankings:", error);
        setPersonalRanking([]);
        setGroupRanking([]);
      }
    };

    fetchRankings();
  }, []);

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="font-bold text-4xl mb-10">
        <span className="text-custom-highlight">{today}</span> 기준 랭킹
      </h1>
      <div className="flex flex-wrap gap-x-10 justify-center space-x-10">
        <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6 w-[30rem]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={CrownImg} alt="crown" className="w-[3rem] h-[3rem]" />
              <h2 className="text-yellow-500 text-3xl font-bold ml-2 mt-3">
                개인랭킹
              </h2>
            </div>
            <img src={InfoImg} alt="info" className="w-[5rem] h-[4rem]" />
          </div>
          <PersonalRanking personalRanking={personalRanking} />
        </div>
        <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6 w-[30rem]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={CrownImg} alt="crown" className="w-[3rem] h-[3rem]" />
              <h2 className="text-yellow-500 text-3xl font-bold ml-2 mt-3">
                소모임랭킹
              </h2>
            </div>
            <img src={GroupImg} alt="group" className="w-[5rem] h-[4rem]" />
          </div>
          <GroupRanking groupRanking={groupRanking} />
        </div>
      </div>
    </div>
  );
}