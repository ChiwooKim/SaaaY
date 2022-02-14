import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccountService } from '../services/account.service';
import { UserService } from 'src/services/user.service';

@Controller('/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

  @Get(':targetId/owner')
  async getOwner(@Param('targetId') targetId: string, @Res() res: Response) {
    const owner = await this.accountService.getOwner(targetId);
    res.status(HttpStatus.OK).json(owner);
  }

  @Get(':targetId/follower')
  async getFollowerList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    const followerList = await this.accountService.getFollowerList(targetId);
    res.status(HttpStatus.OK).json(followerList);
  }

  @Get(':myId/my-follower')
  async myFollower(@Param('myId') myId: string, @Res() res: Response) {
    const followerList = await this.accountService.myFollower(myId);
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

  @Get(':myId/my-following')
  async myFollowing(@Param('myId') myId: string, @Res() res: Response) {
    const followingList = await this.accountService.myFollowing(myId);
    res.status(HttpStatus.OK).json(followingList);
  }

  @Post(':targetId/follow')
  @UseGuards(JwtAuthGuard)
  async addMyFollowingList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    let user;
    for (const req of request.rawHeaders) {
      if (req.includes('Bearer')) {
        const payload = JSON.parse(
          Buffer.from(req.split('.')[1], 'base64').toString(),
        );
        user = await this.userService.findUserByEmail(payload.email);
        break;
      }
    }
    console.log(user);
    const result = await this.accountService.addMyFollowingList(
      targetId,
      user.id,
    );
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

  @Get(':targetId/blocklist')
  async getBlockList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
  ) {
    const blockList = await this.accountService.getBlockList(targetId);
    res.status(HttpStatus.OK).json(blockList);
  }
}
