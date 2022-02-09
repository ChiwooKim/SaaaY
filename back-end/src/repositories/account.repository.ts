import { driver } from './connection-pools/neo4j.db';

export async function getFollowerList(targetId: string) {
  let result;
  const session = driver().session();

  try {
    result = await session.run(
      `MATCH (me) <- [:FOLLOW] - (target) WHERE id(me) = ${targetId} RETURN target`,
    );
    const followerList = [];

    for (const record of result.records) {
      followerList.push(record._fields[0]);
    }
  } finally {
    await session.close();
  }

  await driver().close();

  return result.records;
}
