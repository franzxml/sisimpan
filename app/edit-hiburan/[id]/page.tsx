import { getHiburanById, editHiburan } from "@/app/lib/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditHiburanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  const item = await getHiburanById(id);

  if (!item) {
    notFound();
  }

  async function handleAction(formData: FormData) {
    "use server";
    const result = await editHiburan(id, formData);
    return result;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Edit Hiburan</h1>
        
        <form action={handleAction} className="space-y-4">
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

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Simpan Perubahan
            </button>
            <Link
              href="/dashboard"
              className="w-full py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
