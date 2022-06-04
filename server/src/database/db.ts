import { Pool } from "pg";

const pool = new Pool();

async function initDB() {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid DEFAULT uuid_generate_v4 (),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      PRIMARY KEY (id)
    )
  `);
}

initDB();

export { pool };
