import { driver } from './connection-pools/neo4j.db';

// user가 생성한 앞으로의 일정 가져오기(get)
export async function getScheduleList(email: string) {
  const session = driver().session();
  let result;
  const dateList = []

  try {
    result = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule) RETURN b`,
    )

    for (const rec of result.records) {
      dateList.push(rec._fields[0].properties.date);
    }
  
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();
  // console.log(result)
  return dateList
}

// 일정 생성하기(post)
export async function createSchedule(email: string, date: string) {
  const session = driver().session()

  try {
    const create = await session.run(
      `CREATE (n:Schedule{date:"${date}"}) RETURN n`,
    )

    const make_rel = await session.run(
      `MATCH (a:User{email:"${email}"}), (b:Schedule{date:"${date}"}) CREATE (a)-[r:CREATE_IN]->(b) RETURN a, r, b`,
    )
  
  } finally {
    await session.close()
  }
  
  // on application exit:
  await driver().close()
  
  const result = { message: 'Create Schedule', email: `${email}`, date: `${date}` }

  return result;
}

// 일정 수정하기(patch)
export async function updateSchedule(email: string, date: string, update_date: string) {
  const session = driver().session()
  let update;
  try {
    update = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule{date:"${date}"}) SET b.date = "${update_date}" RETURN b`
    )
  
  } finally {
    await session.close()
  }
  
  // on application exit:
  await driver().close()
  const result = { message: 'Update Schedule', date: update.records[0]._fields[0].properties.date}
  return result;
}

// 일정 삭제하기(delete)
export async function deleteSchedule(email: string, date: string) {
  const session = driver().session();

  try {
    const del = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule{date:"${date}"}) DETACH DELETE b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const result = { message: 'Delete Schedule', email: `${email}`}
  return result
}
