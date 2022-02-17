export default function () {
  return {
    rooms: [],
    room: {
      id: 0,
      roomName: "", // 방이름
      category: [], // 방 카테고리
      moderator: [], // 방장 목록 ( 방장이 나갔다 들어와도 방장권한 유지)
      notice: "", // 방 공지사항
      participates: [], // 방 참가자( 방장 목록과 중복되게 현재 참가자는 무조건 여기)
    },
    index: 0,
  };
}
