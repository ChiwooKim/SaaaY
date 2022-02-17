import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccountService } from '../services/account.service';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('/accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const user = await this.userService.findUserByEmail(payload.email);
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
  @UseGuards(JwtAuthGuard)
  async deleteMyFollowingList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const user = await this.userService.findUserByEmail(payload.email);
    const result = await this.accountService.deleteMyFollowingList(
      targetId,
      user.id,
    );
    if (result) {
      res.status(204).send();
    } else {
      throw new BadRequestException('팔로잉 리스트에 없는 유저입니다.');
    }
  }

  @Post(':targetId/block')
  @UseGuards(JwtAuthGuard)
  async addMyBlockList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const user = await this.userService.findUserByEmail(payload.email);
    const result = await this.accountService.addMyBlockList(targetId, user.id);
    if (result) {
      res.status(201).send();
    } else {
      throw new BadRequestException('이미 블락 리스트에 있는 유저입니다.');
    }
  }

  @Delete(':targetId/block')
  @UseGuards(JwtAuthGuard)
  async deleteMyBlockList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const user = await this.userService.findUserByEmail(payload.email);
    const result = await this.accountService.deleteMyBlockList(
      targetId,
      user.id,
    );
    if (result) {
      res.status(204).send();
    } else {
      throw new BadRequestException('블락 리스트에 없는 유저입니다.');
    }
  }

  @Get(':targetId/blocklist')
  @UseGuards(JwtAuthGuard)
  async getBlockList(
    @Param('targetId') targetId: string,
    @Res() res: Response,
    @Headers('Authorization') accessToken,
  ) {
    const payload = await this.authService.verifyUser(accessToken);
    const user = await this.userService.findUserByEmail(payload.email);
    if (targetId === user.id.toString()) {
      const blockList = await this.accountService.getBlockList(targetId);
      res.status(HttpStatus.OK).json(blockList);
    } else {
      res.status(403).send();
    }
  }

  @Get('id')
  @UseGuards(JwtAuthGuard)
  async getUserId(@Res() res: Response, @Headers('Authorization') accessToken) {
    const payload = await this.authService.verifyUser(accessToken);
    const user = await this.userService.findUserByEmail(payload.email);
    res.status(HttpStatus.OK).json(user);
  }
}
