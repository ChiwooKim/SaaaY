import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entity/member.entity';
import { MemberRepository } from 'src/repositories/member.repository';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: MemberRepository,
  ) {}

  public async findMember(memberId: string): Promise<Member> {
    // let memberDto;
    // await this.memberRepository.findOne(memberId).then((m) => {
    //   return m;
    // });
    // return memberDto;
    return this.memberRepository.findOne(memberId);
  }
}
