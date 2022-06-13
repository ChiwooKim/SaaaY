import { uri, user, password } from '../../config/neo4j-config.json';
import neo4j from 'neo4j-driver';
export function driver() {
  return neo4j.driver(uri, neo4j.auth.basic(user, password));
}

/**
 * 사용 example  
 * 
    const stringified = stringify(userDto);
    result = await session.run(
        `create (user:User ${stringified}) RETURN user`,
    );
 * @returns 
 */
export function stringify(obj: object): string {
  let str = '{';

  for (const key of Object.keys(obj)) {
    str += `${key}:'${obj[key]}',`;
  }
  str = str.slice(0, -1);
  str += '}';
  console.log(str);
  return str;
}

export async function executeQuery<T>(query: string): Promise<T> {
  let result;
  const session = driver().session();

  try {
    result = await session.run(query);
  } finally {
    await session.close();
  }

  await driver().close();

  return result.records;
}
