import { driver, executeQuery } from './connection-pools/neo4j.db';

export async function getOwner(targetId: string) {
  return await executeQuery(
    `MATCH (target) WHERE id(target) = ${targetId} RETURN target`,
  );
}

export async function getFollowerList(targetId: string) {
  let result;
  const followingId = [];
  let followings;
  const session = driver().session();

  try {
    followings = await session.run(
      `MATCH (me) - [:FOLLOW] -> (target) WHERE id(me) = ${targetId} RETURN target`,
    );
    for (const following of followings.records) {
      followingId.push(following._fields[0].identity.low);
    }
    result = await session.run(
      `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`,
    );
  } finally {
    await session.close();
  }
  for (const record of result.records) {
    record._fields[0].properties.isFollower = true;
    if (followingId.includes(record._fields[0].identity.low)) {
      record._fields[0].properties.isFollowing = true;
    } else {
      record._fields[0].properties.isFollowing = false;
    }
  }

  await driver().close();

  return result.records;
}

export async function myFollower(myId: string) {
  let result;
  const followerList = [];
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${myId} RETURN target`,
    );
  } finally {
    await session.close();
  }
  for (const record of result.records) {
    followerList.push(record._fields[0].identity.low);
  }

  await driver().close();

  return followerList;
}

export async function getFollowingList(targetId: string) {
  let result;
  const followerId = [];
  let followers;
  const session = driver().session();

  try {
    followers = await session.run(
      `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`,
    );
    for (const follower of followers.records) {
      followerId.push(follower._fields[0].identity.low);
    }
    result = await session.run(
      `MATCH (me) - [:FOLLOW] -> (target) WHERE id(me) = ${targetId} RETURN target`,
    );
  } finally {
    await session.close();
  }
  for (const record of result.records) {
    record._fields[0].properties.isFollowing = true;
    if (followerId.includes(record._fields[0].identity.low)) {
      record._fields[0].properties.isFollower = true;
    } else {
      record._fields[0].properties.isFollower = false;
    }
  }

  await driver().close();

  return result.records;
}

export async function myFollowing(myId: string) {
  let result;
  const followingList = [];
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [:FOLLOW] -> (target) WHERE id(me) = ${myId} RETURN target`,
    );
  } finally {
    await session.close();
  }
  for (const record of result.records) {
    followingList.push(record._fields[0].identity.low);
  }

  await driver().close();

  return followingList;
}

export async function addFollow(targetId: string, myId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [rel:FOLLOW] -> (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} RETURN rel`,
    );
    if (result.records[0]) {
      return false;
    }
    await session.run(
      `MATCH (me), (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} CREATE (me) - [:FOLLOW] -> (target)`,
    );
  } finally {
    await session.close();
  }

  await driver().close();
  return true;
}

export async function deleteFollow(targetId: string, myId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [rel:FOLLOW] -> (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} RETURN rel`,
    );
    if (!result.records[0]) {
      return false;
    }
    await session.run(
      `MATCH (me) - [rel:FOLLOW] -> (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} DELETE rel`,
    );
  } finally {
    await session.close();
  }

  await driver().close();
  return true;
}

export async function addBlock(targetId: string, myId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [rel:BLOCK] -> (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} RETURN rel`,
    );
    if (result.records[0]) {
      return false;
    }
    await session.run(
      `MATCH (me), (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} CREATE (me) - [:BLOCK] -> (target)`,
    );
  } finally {
    await session.close();
  }

  await driver().close();
  return true;
}

export async function deleteBlock(targetId: string, myId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [rel:BLOCK] -> (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} RETURN rel`,
    );
    if (!result.records[0]) {
      return false;
    }
    await session.run(
      `MATCH (me) - [rel:BLOCK] -> (target) WHERE id(me) = ${myId} AND id(target) = ${targetId} DELETE rel`,
    );
  } finally {
    await session.close();
  }

  await driver().close();
  return true;
}

export async function getBlockList(targetId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [:BLOCK] -> (target) WHERE id(me) = ${targetId} RETURN target`,
    );
  } finally {
    await session.close();
  }

  await driver().close();

  return result.records;
}
