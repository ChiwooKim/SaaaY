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
import { Room } from 'src/models/RoomModel';

import { RoomService } from '../services/room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(
    @Body()
    RoomDTO: Room,
    @Res() res: Response,
  ) {
    const room = this.roomService.createRoom(
      RoomDTO.roomName,
      RoomDTO.category,
      RoomDTO.moderator,
      RoomDTO.notice,
      RoomDTO.participates,
    );
    res.status(HttpStatus.CREATED).json({ message: 'RoomCreated', room: room });
  }

  @Get('/list')
  getRooms(@Res() res: Response) {
    console.log('/getRooms');
    res.status(HttpStatus.OK);
    const Rooms = this.roomService.getRooms();
    console.log('rooms : ', Rooms);
    res.status(HttpStatus.OK).json(Rooms);
  }

  @Get('/:Id')
  getRoom(@Param('Id') Id: string, @Res() res: Response) {
    console.log('/getRoom');
    res.status(HttpStatus.OK);
    const Room = this.roomService.getRoom(Id);
    res.status(HttpStatus.OK).json(Room);
  }

  @Patch(':Id')
  updateRoom(
    @Param('Id') Id: string,
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
    console.log('updateRoom');
    const room = this.roomService.updateRoom(Id, params);

    res.status(HttpStatus.OK).json({ message: room });
  }

  @Delete('/:Id')
  deleteRoom(@Param('Id') Id: string, @Res() res: Response) {
    console.log('deleteRoom');
    this.roomService.deleteRoom(Id);
    res.status(HttpStatus.OK).json({ message: `id` + 'is deleted' });
  }
}
