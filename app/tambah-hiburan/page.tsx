"use client";

import { useState } from "react";
import { tambahHiburan } from "@/app/lib/actions";
import Link from "next/link";

export default function TambahHiburanPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await tambahHiburan(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Tambah Hiburan</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tipe" className="block text-sm font-medium text-gray-700">
              Tipe Hiburan
            </label>
            <input
              type="text"
              name="tipe"
              id="tipe"
              required
              placeholder="Contoh: Anime, Manga, Game"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama Hiburan
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              required
              placeholder="Contoh: One Piece"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Link Hiburan
            </label>
            <input
              type="url"
              name="link"
              id="link"
              required
              placeholder="Contoh: https://example.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="pemilik" className="block text-sm font-medium text-gray-700">
              Nama Pemilik
            </label>
            <input
              type="text"
              name="pemilik"
              id="pemilik"
              required
              placeholder="Contoh: Franz"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status Hiburan
            </label>
            <select
              name="status"
              id="status"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="belummulai">Belum Mulai</option>
              <option value="sedangdalamprogres">Sedang dalam Progres</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div>
            <label htmlFor="komentar" className="block text-sm font-medium text-gray-700">
              Komentar (Opsional)
            </label>
            <textarea
              name="komentar"
              id="komentar"
              placeholder="Tambahkan catatan atau komentar..."
              rows={3}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            ></textarea>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors font-semibold"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <Link
              href="/dashboard"
              className="w-full py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
