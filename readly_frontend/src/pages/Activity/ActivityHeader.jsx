import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomHeader from "../../components/CustomHeader";

const groupList = [
  { id: 1, title: "group1" },
  { id: 2, title: "group2" },
];

export default function ActivityHeader() {
  const [isGroupListOpen, setIsGroupListOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(groupList[0]);
  const navigate = useNavigate();

  const toggleGroupList = () => {
    setIsGroupListOpen(!isGroupListOpen);
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);
    setIsGroupListOpen(false);
    navigate(`/activity/${group.id}`);
  };

  return (
    <div className="flex-1 items-center relative">
      <CustomHeader />
      <h2
        className="absolute text-2xl font-bold top-1/2 left-[20rem] transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
        onClick={toggleGroupList}
      >
        <span className="text-custom-highlight">{selectedGroup.title}</span> 소모임
      </h2>

      {isGroupListOpen && (
        <div className="absolute top-full left-[20rem] transform -translate-x-1/2 mt-2 bg-gray-200 rounded-lg shadow-lg z-20">
          <ul className="p-2">
            {groupList.map((group) => (
              <li
                key={group.id}
                className="px-4 py-2 hover:bg-gray-300 cursor-pointer rounded-md border border-red-500 m-2"
                onClick={() => selectGroup(group)}
              >
                {group.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}