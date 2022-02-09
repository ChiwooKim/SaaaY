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
}

// import { RequestHandler } from 'express';
// import { Accounts } from '../services/Accounts';

// const accounts = new Accounts();

// export const getFollowerList: RequestHandler<{ id: string }> = (
//   req,
//   res,
//   next,
// ) => {
//   const targetId = req.params.id;

//   async function getList(targetId: string) {
//     const result = await accounts.getFollowerList(targetId);
//     res.json({ followerList: result });
//   }
//   getList(targetId).catch((err) => {
//     console.log(err);
//   });
// };

// export const getFollowingList: RequestHandler<{ id: string }> = (
//   req,
//   res,
//   next,
// ) => {
//   const targetId = req.params.id;

//   async function getList(targetId: string) {
//     const result = await accounts.getFollowingList(targetId);
//     res.json({ FollowingList: result });
//   }
//   getList(targetId).catch((err) => {
//     console.log(err);
//   });
// };

// export const createFollow: RequestHandler<{ id: string }> = (
//   req,
//   res,
//   next,
// ) => {
//   const targetId = req.params.id;
//   const myId = '4';

//   async function addMyFollowerList(targetId: string, myId: string) {
//     const result = await accounts.addMyFollowerList(targetId, myId);
//     if (result) {
//       res.status(201).json({ message: 'request successed' });
//     } else {
//       res.status(400).json({ message: 'request failed' });
//     }
//   }
//   addMyFollowerList(targetId, myId).catch((err) => {
//     console.log(err);
//   });
// };
