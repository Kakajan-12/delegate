import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

let initialized = false;

export async function ensureSchema() {
  if (initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS participants (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      email TEXT,
      category TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE participants ADD COLUMN IF NOT EXISTS phone TEXT`;
  await sql`ALTER TABLE participants ADD COLUMN IF NOT EXISTS email TEXT`;
  await sql`ALTER TABLE participants ALTER COLUMN category DROP NOT NULL`;
  initialized = true;
}