import { Injectable } from '@nestjs/common';
import { Record } from 'neo4j-driver';
import {
  getFollowerList,
  getFollowingList,
  addFollow,
  deleteFollow,
  addBlock,
  deleteBlock,
  getBlockList,
  getOwner,
  myFollower,
  myFollowing,
} from '../repositories/account.repository';

@Injectable()
export class AccountService {
  public async getOwner(targetId: string) {
    const result = await getOwner(targetId);
    const el = result[Symbol.iterator]();
    for (const res of el) {
      res._fields[0].properties['password'] = undefined;
      // console.log(res._fields[0].properties);
    }
    return result;
  }

  public async getFollowerList(targetId: string): Promise<Record> {
    const result = await getFollowerList(targetId);
    const el = result[Symbol.iterator]();
    for (const res of el) {
      res._fields[0].properties['password'] = undefined;
      // console.log(res._fields[0].properties);
    }
    return result;
  }

  public async myFollower(myId: string) {
    const result = await myFollower(myId);
    return result;
  }

  public async getFollowingList(targetId: string): Promise<Record> {
    const result = await getFollowingList(targetId);
    const el = result[Symbol.iterator]();
    for (const res of el) {
      res._fields[0].properties['password'] = undefined;
      // console.log(res._fields[0].properties);
    }
    return result;
  }

  public async myFollowing(myId: string) {
    const result = await myFollowing(myId);
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

  public async getBlockList(targetId: string) {
    const result = await getBlockList(targetId);
    const el = result[Symbol.iterator]();
    for (const res of el) {
      res._fields[0].properties['password'] = undefined;
      // console.log(res._fields[0].properties);
    }
    return result;
  }
}
