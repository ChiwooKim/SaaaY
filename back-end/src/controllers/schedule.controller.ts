import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ScheduleService } from '../services/schedule.service';

@Controller('/schedule')
export class ScheduleController {
  res: any;
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/list')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async getScheduleList(
    @Body()
    params: {
      email: string,
    },
    @Res() res: Response,
  ) {
    const scheduleList = await this.scheduleService.getScheduleList(params.email);
    res.status(HttpStatus.OK).json(scheduleList);
  }

  @Post('create')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async createSchedule(
    @Body()
    params: {
      email: string,
      date: string,
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.createSchedule(params.email, params.date);
    res.status(HttpStatus.CREATED).json(schedule);
  }

  @Put('update')
  // 일정 변경
  async updateSchedule(
    @Body()
    params: {
      email: string,
      date: string,
      update_date: string
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.updateSchedule(params.email, params.date, params.update_date);
    res.status(HttpStatus.OK).json(schedule);
  }

  @Delete('delete')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async deleteSchedule(
    @Body()
    params: {
      email: string,
      date: string,
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.deleteSchedule(params.email, params.date);
    res.status(HttpStatus.OK).json(schedule);
  }
}