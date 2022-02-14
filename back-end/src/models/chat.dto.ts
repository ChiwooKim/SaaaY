import { Chat } from 'src/entity/chat.entity';

export class ChatDto {
  public otheruserid: string;
  public text: string;
  public from: string;

  constructor(chats: Chat) {
    this.otheruserid = chats.otheruserid;
    this.text = chats.text;
    this.from = chats.from;
  }
}
