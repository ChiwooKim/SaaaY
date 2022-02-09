import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { RoomService } from '../services/room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(
    @Body()
    params: {
      roomName: string;
      category: string[];
      moderator: string[];
      notice: string;
      participates: string[];
    },
    @Res() res: Response,
  ) {
    const room = this.roomService.createRoom(
      params.roomName,
      params.category,
      params.moderator,
      params.notice,
      params.participates,
    );
    res.status(HttpStatus.CREATED).json({ message: 'RoomCreated', room: room });
  }

  @Get('/list')
  getRooms(@Res() res: Response) {
    console.log('/getRooms');
    res.status(HttpStatus.OK);
    const Rooms = this.roomService.getRooms();
    console.log('rooms : ', Rooms);
    res.status(HttpStatus.OK).json(JSON.stringify(Rooms));
  }

  // getRooms: RequestHandler = (req, res, next) => {
  //   console.log('getRooms');
  //   const rooms = roomService.getRooms();
  //   // console.log(rooms);
  //   res.json({ rooms: rooms });
  // };

  // getRoom: RequestHandler<{ id: string }> = (req, res, next) => {
  //   console.log('getRoom');
  //   const roomId = req.params.id;

  //   const room = roomService.getRoom(roomId);

  //   res.json({ room: room });
  // };

  @Get('/:Id')
  getRoom(@Param('Id') Id: string, @Res() res: Response) {
    console.log('/getRoom');
    res.status(HttpStatus.OK);
    const Room = this.roomService.getRoom(Id);
    res.status(HttpStatus.OK).json(JSON.stringify(Room));
  }

  /*
  export const updateRoom: RequestHandler<{ id: string }> = (req, res, next) => {
    console.log("updateTodo");
    const todoId = req.params.id;
  
    const updatedText = (req.body as { text: string }).text;
  
    console.log("id: ", todoId);
  
    const updatedTodo = roomService.updateRoom(todoId, updatedText);
  
    res.json({ message: "Updated!", updatedTodo: updatedTodo });
  };
  */

  /*
  deleteRoom: RequestHandler<{ id: string }> = (req, res, next) => {
    console.log('deleteTodo');
    const todoId = req.params.id;

    roomService.deleteRoom(todoId);

    res.json({ message: 'Room deleted!' });
  };
  */

  @Delete('/:Id')
  deleteRoom(@Param('Id') Id: string, @Res() res: Response) {
    console.log('deleteRoom');
    this.roomService.deleteRoom(Id);
    res.status(HttpStatus.OK).json({ message: `id` + 'is deleted' });
  }
}
