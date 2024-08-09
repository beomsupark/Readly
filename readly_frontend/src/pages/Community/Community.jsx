import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupImg from "../../assets/header/group_img.png";
import GoButton from "../../components/GoButton/GoButton";
import {
  joinGroup,
  getAvailableGroups,
  getMemberGroups,
} from "../../api/communityAPI";
import useUserStore from "../../store/userStore.js";

export default function Community() {
  const navigate = useNavigate();
  const { user, token } = useUserStore();
  const [joinStatus, setJoinStatus] = useState({});
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const [availableGroups, memberGroups] = await Promise.all([
        getAvailableGroups(),
        getMemberGroups(user.id),
      ]);

      const memberGroupIds = memberGroups.map((group) => group.groupId);
      const filteredGroups = availableGroups.filter(
        (group) => !memberGroupIds.includes(group.groupId)
      );
      setGroups(filteredGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchGroups();
    }
  }, [user, token]);

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
        fetchGroups(); // 그룹 목록을 새로고침합니다
        navigate(`/activity/${groupId}`); // 그룹 페이지로 리다이렉트
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
      <h2 className="font-bold text-2xl mb-2"><span className="text-custom-highlight">소모임</span>을 만들어요!</h2>
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-10 mb-4">
          {groups.map((item) => (
            <div
              key={item.groupId}
              className="flex bg-[#F8F8F8] w-[35rem] h-[18rem] rounded-lg overflow-hidden shadow-lg items-center"
            >
              <img
                src={GroupImg}
                alt="Group"
                className="w-[10rem] h-[10rem] p-4"
              />
              <div className="flex flex-col p-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-[#E5E7EB] text-[#777777] rounded-md p-2 text-sm font-semibold"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mb-2">{item.description}</p>
                <p className="text-sm text-gray-600">
                  인원: {item.currentParticipants}명 / {item.maxParticipants}명
                </p>
                {item.currentParticipants < item.maxParticipants &&
                  joinStatus[item.groupId] !== "success" && (
                    <GoButton
                      text="참여하기"
                      onClick={() => handleJoinGroup(item.groupId)}
                      disabled={joinStatus[item.groupId] === "success"}
                    />
                  )}
                {joinStatus[item.groupId] === "success" && (
                  <p className="text-green-500 font-bold">참여 완료!</p>
                )}
                {joinStatus[item.groupId] === "fail" && (
                  <p className="text-red-500">참여 실패</p>
                )}
                {joinStatus[item.groupId] === "error" && (
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
