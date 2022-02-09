export class Room {
  //roomName은 방 제목 category는 방 카테고리 moderator는 방장의 userid(방장이 여러명일수 있으므로 배열로 한다.)
  constructor(
    public id: string, // 방아이디
    public roomName: string, // 방이름
    public category: string[], // 방 카테고리
    public moderator: string[], // 방장 목록 ( 방장이 나갔다 들어와도 방장권한 유지)
    public notice: string, // 방 공지사항
    public participates: string[], // 방 참가자( 방장 목록과 중복되게 현재 참가자는 무조건 여기)
  ) {}
}
