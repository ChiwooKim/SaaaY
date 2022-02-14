export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Room {
  id: number;
  roomName: string;
  category: string[];
  moderator: string[];
  notice: string;
}
