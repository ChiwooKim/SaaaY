import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Post,
  Res,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ScheduleService } from '../services/schedule.service';
import { AuthService } from 'src/auth/auth.service';
@Controller('/schedule')
export class ScheduleController {
  res: any;
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly authService: AuthService,
  ) {}
  @Get('')
  @UseGuards(JwtAuthGuard)
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async getScheduleList(
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const scheduleList = await this.scheduleService.getScheduleList(
      payload.email,
    );
    res.status(HttpStatus.OK).json(scheduleList);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async createSchedule(
    @Body()
    params: {
      id: string;
      title: string;
      start: string;
      end: string;
      allDay: boolean;
    },
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const schedule = await this.scheduleService.createSchedule(
      payload.email,
      params.id,
      params.title,
      params.start,
      params.end,
      params.allDay,
    );
    res.status(HttpStatus.CREATED).json(schedule);
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  // 일정 변경
  async updateSchedule(
    @Body()
    params: {
      id: string;
      title: string;
      start: string;
      end: string;
      allDay: boolean;
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.updateSchedule(
      params.id,
      params.title,
      params.start,
      params.end,
      params.allDay,
    );
    res.status(HttpStatus.OK).json(schedule);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async deleteSchedule(
    @Body()
    params: {
      id: string;
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.deleteSchedule(params.id);
    res.status(HttpStatus.OK).json(schedule);
  }
}
