import { RequestHandler } from "express";
import db_config from "../config/db-config.json";

export class Accounts {
  neo4j = require("neo4j-driver");
  uri = db_config.uri;
  user = db_config.user;
  password = db_config.password;

  public async getFollowerList(targetId: string) {
    const driver = this.neo4j.driver(
      this.uri,
      this.neo4j.auth.basic(this.user, this.password)
    );
    const session = driver.session();

    let result;

    try {
      result = await session.run(
        `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`
      );
      const followerList = [];

      for (const record of result.records) {
        followerList.push(record._fields[0]);
      }
    } finally {
      await session.close();
    }

    await driver.close();

    return result.records;
  }

  public async getFollowingList(targetId: string) {
    const driver = this.neo4j.driver(
      this.uri,
      this.neo4j.auth.basic(this.user, this.password)
    );
    const session = driver.session();

    let result;

    try {
      result = await session.run(
        `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`
      );
      const followerList = [];

      for (const record of result.records) {
        followerList.push(record._fields[0]);
      }
    } finally {
      await session.close();
    }

    await driver.close();

    return result.records;
  }
}
