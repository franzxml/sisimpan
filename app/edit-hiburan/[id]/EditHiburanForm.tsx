"use client";

import { useState } from "react";
import { editHiburan } from "@/app/lib/actions";
import Link from "next/link";

interface EditHiburanFormProps {
  id: number;
  item: {
    tipe: string;
    nama: string;
    link: string;
    pemilik: string;
    status: string;
    komentar: string;
  };
}

export default function EditHiburanForm({ id, item }: EditHiburanFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await editHiburan(id, formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
        <label htmlFor="tipe" className="block text-sm font-medium text-gray-700">
          Tipe Hiburan
        </label>
        <input
          type="text"
          name="tipe"
          id="tipe"
          defaultValue={item.tipe}
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
          defaultValue={item.nama}
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
          defaultValue={item.link}
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
          defaultValue={item.pemilik}
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
          defaultValue={item.status}
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
          defaultValue={item.komentar}
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
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <Link
          href="/dashboard"
          className="w-full py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
