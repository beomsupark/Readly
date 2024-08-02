const ranking = [
  { id: 1, ranking: "🥇" },
  { id: 2, ranking: "🥈" },
  { id: 3, ranking: "🥉" },
];

const GroupRanking = ({ groupRanking }) => {
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
    </ol>
  );
};

export default GroupRanking;