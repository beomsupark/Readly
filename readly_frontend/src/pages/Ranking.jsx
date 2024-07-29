import React from "react";

import CrownImg from "../assets/level/crown.png";
import InfoImg from "../assets/header/info_img.png";
import GroupImg from "../assets/header/group_img.png";

export default function Ranking() {
  const ranking = [
    { id: 1, ranking: "🥇" },
    { id: 2, ranking: "🥈" },
    { id: 3, ranking: "🥉" },
  ];

  const personal = [
    { id: 1, username: "user1", readed: 20 },
    { id: 2, username: "user2", readed: 10 },
    { id: 3, username: "user3", readed: 2 },
    { id: 30, username: "닉네임", readed: 1 },
  ];

  const group = [
    { id: 1, groupname: "group1", readed: 20 },
    { id: 2, groupname: "group2", readed: 10 },
    { id: 3, groupname: "group3", readed: 2 },
    { id: 15, groupname: "소모임", readed: 1 },
  ];

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="font-bold text-4xl font-bold mb-10">
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
          <ol className="space-y-4">
            {personal.map((person, index) => {
              const rank = ranking.find((r) => r.id === person.id);
              return (
                <React.Fragment key={person.id}>
                  {rank === undefined && index !== 0 && <><li className="ml-2">...</li><li className="ml-2.5">..</li></>}
                  <li
                    className={`flex items-center justify-between ${
                      person.id === 1 ? "text-3xl font-bold" : rank ? "text-lg" : "text-sm text-gray-500"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {rank ? rank.ranking : person.id}
                      </span>{" "}
                      {person.username}
                    </div>
                    <span
                      className={`${
                        person.id === 1 ? "text-[#B73D3D]" : "text-[#868686]"
                      }`}
                    >
                      {person.readed}권
                    </span>
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
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
          <ol className="space-y-4">
            {group.map((grp, index) => {
              const rank = ranking.find((r) => r.id === grp.id);
              return (
                <React.Fragment key={grp.id}>
                  {rank === undefined && index !== 0 && <><li className="ml-2">...</li><li className="ml-2.5">..</li></>}
                  <li
                    className={`flex items-center justify-between ${
                      grp.id === 1 ? "text-3xl font-bold" : rank ? "text-lg" : "text-sm text-gray-500"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {rank ? rank.ranking : grp.id}
                      </span>{" "}
                      {grp.groupname}
                    </div>
                    <span
                      className={`${
                        grp.id === 1 ? "text-[#B73D3D]" : "text-[#868686]"
                      }`}
                    >
                      {grp.readed}권
                    </span>
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
