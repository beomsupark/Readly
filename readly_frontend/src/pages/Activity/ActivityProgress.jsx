import { useState } from "react";
import BookImg1 from "../../assets/onboard/book.jpg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import GoButton from "../../components/GoButton/GoButton";

const groupBooks = [
  {
    id: 1,
    title: "책 제목 1",
    cover: BookImg1,
    totalPages: 400,
  },
];

const initialGroup = {
  title: "group1",
  leader: "user1",
  tag: "tag1",
  max_member: 6,
  members: [
    { id: 1, name: "user1", currentPage: 50 },
    { id: 2, name: "user2", currentPage: 100 },
    { id: 3, name: "user3", currentPage: 75 },
    { id: 4, name: "user4", currentPage: 200 },
  ],
};

export default function ActivityProgress() {
  const [books, setBooks] = useState(groupBooks);
  const [group, setGroup] = useState(initialGroup);

  const updateCurrentPage = (memberId, newPage) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      members: prevGroup.members.map((member) =>
        member.id === memberId ? { ...member, currentPage: newPage } : member
      ),
    }));
  };

  return (
    <>
      <h2 className="font-bold text-xl mb-1 mt-5">현재 <span className="text-custom-highlight">읽고 있는</span> 책</h2>
      <div className="container mx-auto p-4">
        {books.length === 0 ? (
          <div className="bg-white p-4 rounded-lg mb-4 flex-cols z-100 w-3/5">
            <div className="flex justify-center items-center bg-[#F5F5F5] w-[9rem] h-[12rem]">
              <h1 className="text-5xl text-[#FFFFFF]">+</h1>
            </div>
            <div className="mt-4 flex justify-start">
              <GoButton text="책 등록하기" />
            </div>
          </div>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg mb-4 flex z-100 w-3/5"
            >
              <div>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-[8rem] h-[12rem] mr-4"
                />
                <div className="mt-4 flex justify-start">
                  <GoButton text="책 등록하기" />
                </div>
              </div>
              <div className="flex-1 ml-4">
                {group.members.map((member) => (
                  <div key={member.id} className="mb-4 flex items-center">
                    <p className="mr-4 w-20">{member.name}</p>
                    <div className="flex-1">
                      <ProgressBar
                        currentPage={member.currentPage}
                        totalPages={book.totalPages}
                        onUpdateCurrentPage={(newPage) =>
                          updateCurrentPage(member.id, newPage)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <h2 className="font-bold mb-2 text-xl">
          <span className="text-custom-highlight">책 </span>에 대한{" "}
          <span className="text-custom-highlight">한줄평</span>을 남기고
          싶으신가요?
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="w-[30rem] mt-1 p-2 border rounded-lg"
            placeholder="한줄평을 입력해주세요"
          />
          <GoButton text="생성" />
        </div>
      </div>
    </>
  );
}
