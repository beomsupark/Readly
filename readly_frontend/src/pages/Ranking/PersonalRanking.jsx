const ranking = [
  { id: 1, ranking: "🥇" },
  { id: 2, ranking: "🥈" },
  { id: 3, ranking: "🥉" },
];

const PersonalRanking = ({ personalRanking }) => {
  const currentUserRank = personalRanking.findIndex(item => item.memberName === "ssafy1");

  return (
    <ol className="space-y-4">
      {personalRanking.slice(0, 3).map((item, index) => (
        <li
          key={item.id}
          className={`flex items-center justify-between ${
            index === 0 ? "text-3xl font-bold" : "text-lg"
          }`}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{ranking[index].ranking}</span>{" "}
            {item.memberName}
          </div>
          <span className={index === 0 ? "text-[#B73D3D]" : "text-[#868686]"}>
            {item.booksReadCount}권
          </span>
        </li>
      ))}
      <li className="ml-2">...</li>
      <li className="ml-2.5">..</li>
      {currentUserRank !== -1 && (
        <li className="bg-yellow-100 text-sm text-gray-500 flex items-center justify-between">
          <div>
            현재 {personalRanking[currentUserRank].memberName}님의 랭킹은 {currentUserRank + 1}등 입니다.
          </div>
          <span className="text-[#868686]">
            {personalRanking[currentUserRank].booksReadCount}권
          </span>
        </li>
      )}
    </ol>
  );
};

export default PersonalRanking;