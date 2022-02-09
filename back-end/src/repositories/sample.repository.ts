import { TodoDto } from '../models/todo.dto';
import { pool } from './connection-pools/maria.db';

export async function getTest() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * from test');
    console.log(rows);
    console.log(rows[0]);
    console.log(typeof rows);

    // rows.array.map(
    //   (row: { id: string; test: string }) => new Todo(row.id, row.test)
    // );
    // rows: [ {val: 1}, meta: ... ]

    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [
    //   1,
    //   "mariadb",
    // ]);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}
