import { getHiburanById } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import EditHiburanForm from "./EditHiburanForm";
import Link from "next/link";

export default async function EditHiburanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  
  if (isNaN(id)) {
    notFound();
  }

  const item = await getHiburanById(id);

  if (!item) {
    notFound();
  }

  // Cast item to the expected type for the form
  const formattedItem = {
    tipe: (item.tipe as string) || "",
    nama: (item.nama as string) || "",
    link: (item.link as string) || "",
    pemilik: (item.pemilik as string) || "",
    status: (item.status as string) || "belummulai",
    komentar: (item.komentar as string) || "",
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F4] text-black selection:bg-black selection:text-white font-mono overflow-x-hidden">
      {/* Sistem Kisi Latar Belakang */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header Industrial */}
      <header className="sticky top-0 z-50 border-b-2 border-black bg-[#F4F4F4] px-4 md:px-6 py-3 md:py-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="border-2 border-black bg-black px-2 py-0.5 md:py-1 text-white font-black text-xs md:text-sm">
              SISIMPAN
            </Link>
            <div className="hidden sm:block text-[9px] md:text-[10px] font-bold uppercase tracking-tighter opacity-40 leading-none">
              EDIT MODULE V.2 <br />
              DATABASE HIBURAN
            </div>
          </div>
          
          <nav className="flex items-center gap-1 border-2 border-black p-0.5 md:p-1 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Link href="/dashboard" className="px-2 md:px-4 py-1 hover:bg-black hover:text-white transition-colors text-[10px] md:text-sm font-bold uppercase tracking-tighter">KE DASHBOARD</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl border-2 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] my-8">
          <div className="mb-8 border-b-2 border-black pb-6">
            <div className="mb-4 inline-block border-2 border-black bg-emerald-400 px-2 py-0.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Modification Interface
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Edit <br/><span className="text-blue-600">Hiburan</span> Data</h1>
          </div>

          <EditHiburanForm id={id} item={formattedItem} />
        </div>
      </main>

      {/* Footer Industrial */}
      <footer className="mx-auto w-full max-w-[1400px] border-x-0 md:border-x-2 border-black bg-white p-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-[9px] md:text-[10px] font-black uppercase text-center md:text-left opacity-30 italic">
             SYS READY FOR MODIFICATION
           </div>
           <div className="flex gap-4">
              <div className="h-3 w-3 bg-black" />
              <div className="h-3 w-3 bg-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              <div className="h-3 w-3 bg-emerald-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
           </div>
        </div>
      </footer>
    </div>
  );
}
