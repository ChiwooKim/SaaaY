import { Injectable } from '@nestjs/common';
import {
  getFollowerList,
  getFollowingList,
  addFollow,
  deleteFollow,
  addBlock,
  deleteBlock,
} from '../repositories/account.repository';

@Injectable()
export class AccountService {
  public async getFollowerList(targetId: string) {
    const result = await getFollowerList(targetId);
    return result;
  }

  public async getFollowingList(targetId: string) {
    const result = await getFollowingList(targetId);
    return result;
  }

  public async addMyFollowingList(targetId: string, myId: string) {
    const result = await addFollow(targetId, myId);
    return result;
  }

  public async deleteMyFollowingList(targetId: string, myId: string) {
    const result = await deleteFollow(targetId, myId);
    return result;
  }

  public async addMyBlockList(targetId: string, myId: string) {
    const result = await addBlock(targetId, myId);
    return result;
  }

  public async deleteMyBlockList(targetId: string, myId: string) {
    const result = await deleteBlock(targetId, myId);
    return result;
  }
}
