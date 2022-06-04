import { Pool } from "pg";

const pool = new Pool();

async function initDB() {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID DEFAULT uuid_generate_v4 (),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      PRIMARY KEY (user_id)
    )
  `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        todo_id uuid DEFAULT uuid_generate_v4 (),
        user_id UUID,
        todo TEXT NOT NULL,
        is_completed BOOLEAN NOT NULL,
        PRIMARY KEY (todo_id),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id)
      )
  `);
}

initDB();

export { pool };
