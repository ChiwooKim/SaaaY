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
import { MemberService } from 'src/services/member.service';

// TODO : https://docs.nestjs.com/controllers https://wikidocs.net/148192

@Controller('/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/:memberId')
  getMember(@Param('memberId') memberId: string, @Res() res: Response) {
    res.status(HttpStatus.OK);

    this.memberService
      .findMember('1')
      .then((m) => {
        res.status(HttpStatus.OK).json(m);
      })
      .catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).send();
        console.log(err);
      });
  }
}
