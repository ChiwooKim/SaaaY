import { driver } from './connection-pools/neo4j.db';

// user가 생성한 앞으로의 일정 가져오기(get)
export async function getScheduleList(email: string) {
  const session = driver().session();
  let result;
  const dateList = [];

  try {
    result = await session.run(
      `MATCH (a:User{email:"${email}"})-[r:CREATE_IN]->(b:Schedule) RETURN b`,
    );
    for (const rec of result.records) {
      dateList.push(rec._fields[0].properties);
    }
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();
  console.log(dateList);
  return dateList;
}

// 일정 생성하기(post)
export async function createSchedule(
  email: string,
  id: string,
  title: string,
  start: string,
  end: string,
  allDay: boolean,
) {
  const session = driver().session();
  let result;
  try {
    const create = await session.run(
      `CREATE (n:Schedule{id:"${id}", title:"${title}", start:"${start}", end:"${end}", allDay:${allDay}}) RETURN n`,
    );

    const temp = await create.records[0].get('n').identity.low;

    void (await session.run(
      `MATCH (b:Schedule{id:"${id}", title:"${title}", start:"${start}", end:"${end}", allDay:${allDay}}) SET b.id = "${temp}" RETURN b`,
    ));

    result = await session.run(
      `MATCH (a:User{email:"${email}"}), (b:Schedule{id:"${temp}", title:"${title}", start:"${start}", end:"${end}", allDay:${allDay}}) CREATE (a)-[r:CREATE_IN]->(b) RETURN b`,
    );
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const create_data = result.records[0]._fields[0].properties;
  console.log(create_data);
  return create_data;
}

// 일정 수정하기(put)
export async function updateSchedule(
  title: string,
  start: string,
  end: string,
  allDay: boolean,
) {
  const session = driver().session();
  let update;
  try {
    update = await session.run(
      `MATCH (b:Schedule{title:"${title}"}) SET b.start = "${start}", b.end = "${end}", b.allDay = ${allDay} RETURN b`,
    );
    // console.log(update.records[0].get('b')._fields[0].properties.title);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();
  const result = {
    message: 'Update Schedule',
  };
  console.log(result);
  return result;
}

// 일정 삭제하기(delete)
export async function deleteSchedule(title, start, end, allDay) {
  const session = driver().session();

  try {
    void (await session.run(
      `MATCH (b:Schedule{title:"${title}", start:"${start}", end:"${end}", allDay:${allDay}}) DETACH DELETE b`,
    ));
  } finally {
    await session.close();
  }

  // on application exit:
  await driver().close();

  const result = { message: 'Delete Schedule' };
  console.log(result);
  return result;
}
