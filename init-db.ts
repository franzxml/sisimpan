import { sql } from "./lib/db.ts";

async function initDB() {
  try {
    console.log("Memulai inisialisasi database...");
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log("Tabel 'users' berhasil dibuat atau sudah ada.");

    await sql`
      CREATE TABLE IF NOT EXISTS hiburan (
        id SERIAL PRIMARY KEY,
        tipe TEXT NOT NULL,
        nama TEXT NOT NULL,
        link TEXT NOT NULL,
        pemilik TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'belummulai',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabel 'hiburan' berhasil dibuat atau sudah ada.");
  } catch (error) {
    console.error("Gagal menginisialisasi database:", error);
  }
}

initDB();
