import { useNavigate } from "react-router-dom";
import GroupImg from "../../assets/header/group_img.png";
import GoButton from "../../components/GoButton/GoButton";

export default function Community() {
  const navigate = useNavigate();

  const group = [
    {
      title: "group1",
      leader: "user1",
      tag: "tag1",
      max_member: 6,
      cur_member: 4,
    },
    {
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

  return (
    <>
      <h2 className="font-bold text-2xl mb-2">소모임을 만들어요!</h2>
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-10 mb-4">
          {group.map((item, index) => (
            <div
              key={index}
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
                {item.cur_member < item.max_member && (
                  <GoButton text="참여하기"/>
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
