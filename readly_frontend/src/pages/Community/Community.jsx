// src/components/Community/Community.js
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupImg from "../../assets/header/group_img.png";
import GoButton from "../../components/GoButton/GoButton";
import { joinGroup } from "../../api/communityAPI";
import useUserStore from "../../store/userStore.js";

export default function Community() {
  const navigate = useNavigate();
  const { user, token } = useUserStore();
  const [joinStatus, setJoinStatus] = useState({});

  useEffect(() => {
    console.log("Current user:", user);
    console.log("Current token:", token);
  }, [user, token]);

  const group = [
    {
      id: 1,
      title: "group1",
      leader: "user1",
      tag: "tag1",
      max_member: 6,
      cur_member: 4,
    },
    {
      id: 2,
      title: "group2",
      leader: "user2",
      tag: "tag2",
      max_member: 6,
      cur_member: 6,
    },
  ];

  const handleMakeCommunity = () => {
    navigate("/makecommunity");
  };

  const handleJoinGroup = async (groupId) => {
    console.log(`Join button clicked for group ${groupId}`);
    if (!user || !token) {
      console.log("User not logged in. User:", user, "Token:", token);
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      console.log(
        `Calling joinGroup API for GroupID: ${groupId}, UserID: ${user.id}`
      );
      const result = await joinGroup(groupId, user.id, token);
      console.log("Join group result:", result);

      if (result === 200) {
        console.log(`Successfully joined group ${groupId}`);
        setJoinStatus((prev) => ({ ...prev, [groupId]: "success" }));
        alert("그룹에 성공적으로 참여했습니다!");
      } else {
        console.log(`Failed to join group ${groupId}`);
        setJoinStatus((prev) => ({ ...prev, [groupId]: "fail" }));
        alert("그룹 참여에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error in handleJoinGroup:", error);
      setJoinStatus((prev) => ({ ...prev, [groupId]: "error" }));
      alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <>
      <h2 className="font-bold text-2xl mb-2">소모임을 만들어요!</h2>
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-10 mb-4">
          {group.map((item) => (
            <div
              key={item.id}
              className="flex bg-[#F8F8F8] w-[35rem] h-[18rem] rounded-lg overflow-hidden shadow-lg items-center"
            >
              <img src={GroupImg} alt="Group" className="w-[10rem] h-[10rem]" />
              <div className="flex flex-col p-4">
                <p>{item.tag}</p>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mb-2">{item.description}</p>
                <p className="text-sm text-gray-600 mb-2">{item.leader}</p>
                <p className="text-sm text-gray-600 mb-4">
                  인원: {item.cur_member}명 / {item.max_member}명
                </p>
                {item.cur_member < item.max_member &&
                  joinStatus[item.id] !== "success" && (
                    <GoButton
                      text="참여하기"
                      onClick={() => handleJoinGroup(item.id)}
                      disabled={joinStatus[item.id] === "success"}
                    />
                  )}
                {joinStatus[item.id] === "success" && (
                  <p className="text-green-500 font-bold">참여 완료!</p>
                )}
                {joinStatus[item.id] === "fail" && (
                  <p className="text-red-500">참여 실패</p>
                )}
                {joinStatus[item.id] === "error" && (
                  <p className="text-red-500">오류 발생</p>
                )}
              </div>
            </div>
          ))}

          <div
            onClick={handleMakeCommunity}
            className="flex bg-[#F8F8F8] w-[35rem] h-[18rem] rounded-lg overflow-hidden shadow-lg cursor-pointer items-center justify-center"
          >
            <button className="w-full bg-gray-200 p-4 rounded-lg flex items-center justify-center">
              <p className="text-4xl mr-2">+</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
