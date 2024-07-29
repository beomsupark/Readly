import { useState } from "react";
import GoButton from "../../components/GoButton/GoButton";
import FormField from "../../components/Form/FormField";

export default function MakeCommunity() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [member, setMember] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="flex w-full h-4/5">
      <div className="w-2/5 p-4 mt-10 bg-[#F5F5F5] rounded-xl shadow-md relative">
      <form onSubmit={handleSubmit} className="space-y-12">
          <FormField
            label="소모임 이름을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormField
            label="태그를 입력해주세요"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            multiline={true}
          />
          <FormField
            label="참여 인원을 입력해주세요"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            multiline={true}
          />
      <div className="absolute bottom-4 right-4">
            <GoButton text="소모임 생성" onClick={handleSubmit} />
          </div>
          </form>
    </div>
    </div>
  );
}
