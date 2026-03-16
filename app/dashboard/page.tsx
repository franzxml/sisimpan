import Link from "next/link";
import { getHiburan, logout } from "@/app/lib/actions";
import StatusSelector from "./StatusSelector";

export default async function DashboardPage() {
  const hiburanList = await getHiburan();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "belummulai":
        return "Belum Mulai";
      case "sedangdalamprogres":
        return "Sedang dalam Progres";
      case "selesai":
        return "Selesai";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "belummulai":
        return "bg-gray-100 text-gray-800";
      case "sedangdalamprogres":
        return "bg-blue-100 text-blue-800";
      case "selesai":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard Hiburan</h1>
          <div className="flex gap-3">
            <Link
              href="/tambah-hiburan"
              className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              + Tambah Hiburan
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-2 text-red-600 font-semibold border border-red-200 hover:bg-red-50 transition-colors"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>

        {hiburanList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-xl text-gray-500">Belum ada hiburan yang ditambahkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiburanList.map((item: any) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.tipe}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{item.nama}</h2>
                <p className="text-sm text-gray-600 mb-2">Pemilik: {item.pemilik}</p>
                
                {item.komentar && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4 italic text-sm text-gray-700 border-l-4 border-blue-400">
                    "{item.komentar}"
                  </div>
                )}
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Buka Link ↗
                    </a>
                    <Link
                      href={`/edit-hiburan/${item.id}`}
                      className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
                    >
                      ✏️ Edit
                    </Link>
                  </div>
                  
                  <StatusSelector id={item.id} initialStatus={item.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
