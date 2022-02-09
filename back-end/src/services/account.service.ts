import { Injectable } from '@nestjs/common';
import { getFollowerList } from '../repositories/account.repository';

@Injectable()
export class AccountService {
  public async getFollowerList(targetId: string) {
    const result = await getFollowerList(targetId);
    return result;
  }
}

// import db_config from '../config/db-config.json';

// function test(): { selectedDate: string } {
//   return {
//     selectedDate: '123',
//   };
// }
// export class Accounts {
//   neo4j = require('neo4j-driver');
//   uri = db_config.uri;
//   user = db_config.user;
//   password = db_config.password;

//   public async getFollowerList(targetId: string) {
//     const driver = this.neo4j.driver(
//       this.uri,
//       this.neo4j.auth.basic(this.user, this.password),
//     );
//     const session = driver.session();

//     let result;

//     try {
//       result = await session.run(
//         `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`,
//       );
//       const followerList = [];

//       for (const record of result.records) {
//         followerList.push(record._fields[0]);
//       }
//     } finally {
//       await session.close();
//     }

//     await driver.close();

//     // return result.records;

//     return {
//       selectedDate: 11,
//     };
//   }

//   public async getFollowingList(targetId: string) {
//     const driver = this.neo4j.driver(
//       this.uri,
//       this.neo4j.auth.basic(this.user, this.password),
//     );
//     const session = driver.session();

//     let result;

//     try {
//       result = await session.run(
//         `MATCH (me) - [:FOLLOW] -> (target) WHERE id(me) = ${targetId} RETURN target`,
//       );
//       const followerList = [];

//       for (const record of result.records) {
//         followerList.push(record._fields[0]);
//       }
//     } finally {
//       await session.close();
//     }

//     await driver.close();

//     return result.records;
//   }

//   public async addMyFollowerList(targetId: string, myId: string) {
//     const driver = this.neo4j.driver(
//       this.uri,
//       this.neo4j.auth.basic(this.user, this.password),
//     );
//     const session = driver.session();

//     try {
//       let result = await session.run(
//         `MATCH (me) - [rel:FOLLOW] ->(target) WHERE id(me) = ${myId} AND id(target) = ${targetId} RETURN rel`,
//       );
//       if (result.records[0]) {
//         return false;
//       }
//       await session.run(
//         `MATCH (me), (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} CREATE (me) - [:FOLLOW] -> (target)`,
//       );
//     } finally {
//       await session.close();
//     }

//     await driver.close();
//     return true;
//   }
// }
