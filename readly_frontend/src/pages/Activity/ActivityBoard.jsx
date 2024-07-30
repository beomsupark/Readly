import { useState } from 'react';

export default function ActivityBoard() {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const meetings = [
    { 
      no: 1, 
      date: '2024-07-15', 
      time: '07:11:12',
      content: "A: 이번에 읽은 책 정말 좋았어요. 주인공의 성장 과정이 인상 깊었죠.\nB: 네, 저도 그 부분이 인상 깊었어요. 주인공이 겪는 어려움과 고민들이 공감되더라고요.\nA: 그렇죠. 특히 마지막 부분에서 주인공이 중요한 선택을 하는 장면이 인상 깊었어요.\nB: 맞아요. 그 장면에서 주인공의 내적 갈등이 잘 드러났던 것 같아요.\n\n요약: 책의 주인공 성장 과정에 대해 인상 깊었다고 언급\n주인공의 어려움과 고민에 공감했다고 말함\n특히 마지막 부분의 중요한 선택 장면이 인상 깊었다고 함\n그 장면에서 주인공의 내적 갈등이 잘 드러났다고 평가"
    },
    { 
      no: 2, 
      date: '2024-07-22', 
      time: '08:12:23',
      content: "A: 그리고 작가의 서술 기법도 인상 깊었어요. 세부적인 묘사가 생생했죠.\nB: 네, 맞아요. 등장인물들의 심리를 잘 표현했다고 생각해요.\nA: 그렇죠. 특히 주인공과 주변 인물들 간의 관계 변화가 인상 깊었어요.\nB: 저도 그 부분이 인상 깊었어요. 등장인물들의 성장과 갈등이 잘 드러났죠.\n\n요약: 작가의 세부적인 묘사와 등장인물 심리 표현이 인상 깊었다고 언급\n특히 주인공과 주변 인물들 간의 관계 변화가 인상 깊었다고 말함\n등장인물들의 성장과 갈등이 잘 드러났다고 평가"
    },
    { 
      no: 3, 
      date: '2024-07-29', 
      time: '01:13:22',
      content: "A: 전체적으로 이 책이 인생에 대한 깊이 있는 성찰을 보여준다고 생각해요.\nB: 네, 맞아요. 인생의 의미와 삶의 방향에 대해 생각해볼 수 있었어요.\nA: 그렇죠. 주인공의 선택과 결정이 삶에 미치는 영향을 잘 보여줬어요.\nB: 저도 그렇게 생각해요. 이 책을 읽고 나서 제 자신의 삶을 돌아보게 되었어요.\n\n요약: 이 책이 인생에 대한 깊이 있는 성찰을 보여준다고 평가\n인생의 의미와 삶의 방향에 대해 생각해볼 수 있었다고 말함\n주인공의 선택과 결정이 삶에 미치는 영향을 잘 보여줬다고 언급\n이 책을 읽고 나서 자신의 삶을 돌아보게 되었다고 언급"
    },
    { no: 4, date: '2024-08-06', time: '08:12:12', content: "내용 없음" },
    { no: 5, date: '2024-08-13', time: '12:13:12', content: "내용 없음" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">회의록</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">일시</th>
              <th className="border border-gray-300 px-4 py-2 text-left">내용</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.no} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{meeting.no}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${meeting.date} ${meeting.time}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setSelectedMeeting(selectedMeeting === meeting.no ? null : meeting.no)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {selectedMeeting === meeting.no ? '내용 숨기기' : '내용 보기'}
                  </button>
                  {selectedMeeting === meeting.no && (
                    <div className="mt-2 whitespace-pre-wrap">{meeting.content}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}