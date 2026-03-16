import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables if needed, but since we are in the project
// we can assume DATABASE_URL might be in the environment or we can try to find it.

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not found in environment.");
    return;
  }

  const sql = neon(dbUrl);

  try {
    console.log("Checking and updating 'hiburan' table...");
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS pemilik TEXT NOT NULL DEFAULT '';`;
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'belummulai';`;
    console.log("Migration successful!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
