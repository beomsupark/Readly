const ranking = [
  { id: 1, ranking: "🥇" },
  { id: 2, ranking: "🥈" },
  { id: 3, ranking: "🥉" },
];

const GroupRanking = ({ groupRanking, userGroupsRank, userName }) => {
  return (
    <ol className="space-y-4">
      {groupRanking.slice(0, 3).map((item, index) => (
        <li
          key={item.id}
          className={`flex items-center justify-between ${
            index === 0 ? "text-3xl font-bold" : "text-lg"
          }`}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{ranking[index].ranking}</span>{" "}
            {item.title}
          </div>
          <span className={index === 0 ? "text-[#B73D3D]" : "text-[#868686]"}>
            {item.booksReadCount}권
          </span>
        </li>
      ))}
      <li className="ml-2">...</li>
      <li className="ml-2.5">..</li>
      {userGroupsRank && userGroupsRank.length > 0 ? (
        <>
          <li className="text-sm text-gray-500">현재 {userName}님이 속해 있는 소모임의 랭킹</li>
          {userGroupsRank.map((group) => (
            <li key={group.groupId} className="text-sm font-bold p-2 text-[#878787] flex items-center justify-between">
              <div>
                {group.rank}등 {group.groupName}
              </div>
              <span className="text-[#868686]">
                {group.readBookCount}권
              </span>
            </li>
          ))}
        </>
      ) : (
        <li className="text-sm font-bold p-2 text-[#878787] flex items-center justify-between">현재 {userName}님은 참가하고 있는 소모임이 없습니다</li>
      )}
    </ol>
  );
};

export default GroupRanking;