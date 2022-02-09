import { Injectable } from '@nestjs/common';
import { MemberDto } from 'src/models/member.dto';
import { MemberRepository } from 'src/repositories/member.repository';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  // public async findMember(memberId: string): Promise<MemberDto> {
  //   let memberDto;
  //   await this.memberRepository.findMemberById(memberId).then((m) => {
  //     memberDto = m;
  //   });
  //   return memberDto;
  // }
}
