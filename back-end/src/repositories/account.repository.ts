import { driver } from './connection-pools/neo4j.db';

export async function getFollowerList(targetId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`,
    );
  } finally {
    await session.close();
  }

  await driver().close();

  return result.records;
}

export async function getFollowingList(targetId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) - [:FOLLOW] -> (target) WHERE id(me) = ${targetId} RETURN target`,
    );
  } finally {
    await session.close();
  }

  await driver().close();

  return result.records;
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
