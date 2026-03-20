"use server";

import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "Kata sandi tidak cocok!" };
  }

  // Pastikan tabel ada
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Memasukkan data ke database
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
    
  } catch (error: any) {
    if (error.message?.includes("unique constraint") || error.code === "23505") {
      return { error: "Email sudah terdaftar!" };
    }
    console.error("Registrasi Error:", error);
    return { error: "Gagal mendaftarkan akun. Silakan coba lagi." };
  }

  // Jika berhasil, arahkan ke halaman login
  redirect("/login?success=true");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "true";

  // Mencari user berdasarkan email
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (!user) {
    return { error: "Email atau kata sandi salah!" };
  }

  // Verifikasi password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { error: "Email atau kata sandi salah!" };
  }

  // Set session cookie
  const expiresAt = rememberMe 
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 hari
    : new Date(Date.now() + 24 * 60 * 60 * 1000);    // 1 hari

  (await cookies()).set("session", user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // Jika berhasil, arahkan ke halaman dashboard
  redirect("/dashboard");
}

export async function getSession() {
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return null;

  try {
    const [user] = await sql`
      SELECT id, name, email FROM users WHERE id = ${sessionId}
    `;
    return user || null;
  } catch (error) {
    return null;
  }
}

export async function tambahHiburan(formData: FormData) {
  const tipe = formData.get("tipe") as string;
  const nama = formData.get("nama") as string;
  const link = formData.get("link") as string;
  const pemilik = formData.get("pemilik") as string;
  const status = formData.get("status") as string || "belummulai";
  const komentar = formData.get("komentar") as string || "";

  if (!tipe || !nama || !link || !pemilik) {
    return { error: "Semua field harus diisi!" };
  }

  // Pastikan tabel ada
  await sql`
    CREATE TABLE IF NOT EXISTS hiburan (
      id SERIAL PRIMARY KEY,
      tipe TEXT NOT NULL,
      nama TEXT NOT NULL,
      link TEXT NOT NULL,
      pemilik TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'belummulai',
      komentar TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Coba tambahkan kolom yang mungkin belum ada
  try {
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS pemilik TEXT NOT NULL DEFAULT '';`;
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'belummulai';`;
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS komentar TEXT NOT NULL DEFAULT '';`;
  } catch (err) {
    console.error("Gagal menambahkan kolom:", err);
  }

  try {
    // Memasukkan data ke database
    await sql`
      INSERT INTO hiburan (tipe, nama, link, pemilik, status, komentar)
      VALUES (${tipe}, ${nama}, ${link}, ${pemilik}, ${status}, ${komentar})
    `;
    
  } catch (error: any) {
    console.error("Tambah Hiburan Error:", error);
    return { error: "Gagal menambahkan hiburan. Silakan coba lagi." };
  }

  // Jika berhasil, arahkan ke halaman dashboard
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function getHiburan() {
  // Pastikan kolom ada untuk data lama
  try {
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS pemilik TEXT NOT NULL DEFAULT '';`;
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'belummulai';`;
    await sql`ALTER TABLE hiburan ADD COLUMN IF NOT EXISTS komentar TEXT NOT NULL DEFAULT '';`;
  } catch (err) {
    // Abaikan jika error
  }

  try {
    const data = await sql`
      SELECT * FROM hiburan ORDER BY created_at DESC
    `;
    return data;
  } catch (error) {
    console.error("Gagal mengambil data hiburan:", error);
    return [];
  }
}

export async function getHiburanById(id: number) {
  try {
    const [data] = await sql`
      SELECT * FROM hiburan WHERE id = ${id}
    `;
    return data;
  } catch (error) {
    console.error("Gagal mengambil data hiburan berdasarkan ID:", error);
    return null;
  }
}

export async function editHiburan(id: number, formData: FormData) {
  const tipe = formData.get("tipe") as string;
  const nama = formData.get("nama") as string;
  const link = formData.get("link") as string;
  const pemilik = formData.get("pemilik") as string;
  const status = formData.get("status") as string;
  const komentar = formData.get("komentar") as string;

  if (!tipe || !nama || !link || !pemilik) {
    return { error: "Semua field (kecuali komentar) harus diisi!" };
  }

  try {
    await sql`
      UPDATE hiburan 
      SET tipe = ${tipe}, nama = ${nama}, link = ${link}, pemilik = ${pemilik}, status = ${status}, komentar = ${komentar}
      WHERE id = ${id}
    `;
    revalidatePath("/dashboard");
  } catch (error: any) {
    console.error("Edit Hiburan Error:", error);
    return { error: "Gagal memperbarui hiburan. Silakan coba lagi." };
  }

  redirect("/dashboard");
}

export async function deleteHiburan(id: number) {
  try {
    await sql`
      DELETE FROM hiburan WHERE id = ${id}
    `;
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Hiburan Error:", error);
    return { error: "Gagal menghapus hiburan. Silakan coba lagi." };
  }
}

export async function updateStatusAction(formData: FormData) {
  const idStr = formData.get("id") as string;
  const status = formData.get("status") as string;
  const id = parseInt(idStr);

  if (isNaN(id) || !status) {
    console.error("Data tidak valid:", { idStr, status });
    return { error: `ID (${idStr}) atau Status (${status}) tidak valid.` };
  }

  try {
    await sql`
      UPDATE hiburan SET status = ${status} WHERE id = ${id}
    `;
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengupdate status hiburan:", error);
    return { error: `Gagal mengupdate status: ${error.message || 'Error tidak dikenal'}` };
  }
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/");
}
