import { Injectable } from '@nestjs/common';

import { Room } from '../models/RoomModel';

// const ROOMS: Room[] = [];
@Injectable()
export class RoomService {
  private ROOMS: Room[] = [];
  private generateId = 0;

  public createRoom(
    roomName: string,
    category: string[],
    moderator: string[],
    notice: string,
    participates: string[],
  ): Room {
    const newRoom = new Room(
      this.generateId.toString(),
      roomName,
      category,
      moderator,
      notice,
      participates,
    );
    console.log(newRoom);
    this.generateId++;
    this.ROOMS.push(newRoom);
    return newRoom;
  } // end CreateRoom

  public getRooms(): Room[] {
    // console.log('rooms : ', this.ROOMS);
    //정렬로직 추가
    //좋아한느 카테고리수 + 팔로우한 사람 수
    return this.ROOMS;
  }
  /*
  public sortRooms(): Room[] {
    //방들을 관심사, 나랑친한 참여자에 따라 정렬해주는로직!! NEO4J와 user의 팔로잉 기준으로 정렬!!!그리고 카테고리도!!
    const sortRooms: Room[]; // 나중에 리턴할 룸 목록
    //const userFollowing: string[]; //유저 팔로잉 목록을 받음
    this.ROOMS.forEach((room) => {
      let weight: number = 0;
      userFollowing.forEach((user) => {
        if (room.participates.find(parti === user) != undefined) {
          weight++;
        }
      }// end user for loop);
      )
    }//end room loop
     //
    
    return sortRooms;
}
*/

  public getRoom(id: string): Room {
    const roomIndex = this.ROOMS.findIndex((room) => room.id === id);
    if (roomIndex < 0) {
      throw new Error('Could not find room!');
    }
    return this.ROOMS[roomIndex];
  }

  public updateRoom(id: string, params: any): Room {
    const roomIndex = this.ROOMS.findIndex((room: Room) => room.id === id);
    if (roomIndex < 0) {
      throw new Error('Could not find Room to update!');
    }

    this.ROOMS[roomIndex] = new Room(
      id,
      params.roomName,
      params.category,
      params.moderator,
      params.notice,
      params.participates,
    );

    return this.ROOMS[roomIndex];
  }

  public deleteRoom(id: string): void {
    const todoIndex = this.ROOMS.findIndex((room) => room.id === id);

    if (todoIndex < 0) {
      throw new Error('Could not find room!');
    }

    this.ROOMS.splice(todoIndex, 1);
  }
}
