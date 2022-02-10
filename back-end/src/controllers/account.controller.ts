import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AccountService } from '../services/account.service';

@Controller('/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':targetId/follower')
  async getFollowerList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    const followerList = await this.accountService.getFollowerList(targetId);
    res.status(HttpStatus.OK).json(followerList);
  }

  @Get(':targetId/following')
  async getFollowingList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    const followerList = await this.accountService.getFollowingList(targetId);
    res.status(HttpStatus.OK).json(followerList);
  }

  @Post(':targetId/follow')
  async addMyFollowingList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    // 로그인 기능 연결 후 로그인한 유저 Id 로 변경
    const myId = '4';
    const result = await this.accountService.addMyFollowingList(targetId, myId);
    if (result) {
      res.status(201).send();
    } else {
      throw new BadRequestException('이미 팔로잉 리스트에 있는 유저입니다.');
    }
  }

  @Delete(':targetId/follow')
  async deleteMyFollowingList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    // 로그인 기능 연결 후 로그인한 유저 Id 로 변경
    const myId = '4';
    const result = await this.accountService.deleteMyFollowingList(
      targetId,
      myId,
    );
    if (result) {
      res.status(204).send();
    } else {
      throw new BadRequestException('팔로잉 리스트에 없는 유저입니다.');
    }
  }

  @Post(':targetId/block')
  async addMyBlockList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    // 로그인 기능 연결 후 로그인한 유저 Id 로 변경
    const myId = '4';
    const result = await this.accountService.addMyBlockList(targetId, myId);
    if (result) {
      res.status(201).send();
    } else {
      throw new BadRequestException('이미 블락 리스트에 있는 유저입니다.');
    }
  }

  @Delete(':targetId/block')
  async deleteMyBlockList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    // 로그인 기능 연결 후 로그인한 유저 Id 로 변경
    const myId = '4';
    const result = await this.accountService.deleteMyBlockList(targetId, myId);
    if (result) {
      res.status(204).send();
    } else {
      throw new BadRequestException('블락 리스트에 없는 유저입니다.');
    }
  }
}
