import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  Headers,
} from '@nestjs/common';

import { Response } from 'express';
import { Room } from 'src/models/RoomModel';
import { RoomService } from '../services/room.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Body()
    RoomDTO: Room,
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const room = await this.roomService.createRoom(
      RoomDTO.roomName,
      RoomDTO.category,
      [payload.email],
      RoomDTO.notice,
      RoomDTO.participates,
    );
    if (room) {
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'RoomCreated', room: room });
    } else {
      throw new BadRequestException('방생성에 실패하였습니다');
    }
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
