import { useState } from 'react';

export default function ActivityBoard({groupData}) {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // groupData에서 meetings 정보를 가져옵니다.
  const meetings = groupData.meetings || [];

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