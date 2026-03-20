import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <PageLayout>
      <Header showNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-[1400px] border-x-0 md:border-x-2 border-black min-h-[auto] md:min-h-[80vh] flex flex-col lg:flex-row">
          {/* Kolom Kiri: Headline */}
          <div className="flex-1 p-6 md:p-8 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-center">
            <div className="mb-6 md:mb-8 inline-block self-start border-2 border-black bg-yellow-300 px-3 py-1 text-[10px] md:text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              TRACKING HIBURAN ANDA
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8 md:mb-12">
              Katalog <br />
              <span className="text-blue-600">Hiburan</span> <br />
              Personal
            </h1>
            <p className="max-w-md text-xs md:text-sm font-bold leading-relaxed mb-10 md:mb-12 uppercase">
               SISIMPAN ADALAH APLIKASI UNTUK MENCATAT DAN MENGELOLA DAFTAR HIBURAN ANDA.
               SIMPAN LINK FILM, GAME, ATAU MUSIK DALAM SATU TEMPAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="flex-1 lg:flex-none">
                <Button fullWidth variant="primary" className="px-8 py-4">BUKA DASHBOARD</Button>
              </Link>
              <Link href="/daftar" className="flex-1 lg:flex-none">
                <Button fullWidth variant="secondary" className="px-8 py-4">BUAT AKUN BARU</Button>
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Visualisator Dashboard */}
          <div className="flex-1 bg-white p-6 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden group">
            <div className="relative w-full max-w-[400px] lg:max-w-none aspect-square border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center p-6 md:p-12">
               <div className="absolute top-2 left-2 text-[7px] md:text-[9px] font-bold opacity-30 uppercase tracking-tighter"></div>
               <div className="absolute inset-0 border-2 border-black/10 m-6 md:m-12 rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
               
               <div className="relative z-10 w-full h-full border-2 border-black bg-[#F4F4F4] p-4 md:p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="h-8 md:h-12 w-8 md:w-12 border-2 border-black bg-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                    <div className="text-right">
                       <div className="text-[7px] md:text-[8px] font-black uppercase">PREVIEW</div>
                       <div className="text-sm md:text-xl font-black leading-none">APLIKASI</div>
                    </div>
                  </div>
                  
                  {/* Visualisasi List Hiburan */}
                  <div className="space-y-2 md:space-y-3">
                     {[
                       { label: 'Film: INTERSTELLAR', status: 'BM' },
                       { label: 'Game: RED DEAD REDEMPTION 2', status: 'DP' },
                       { label: 'Kuliah: HERMENEUTIKA', status: 'SL' }
                     ].map((item, i) => (
                       <div key={i} className="border-2 border-black bg-white p-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center text-[8px] md:text-[10px] font-black">
                          <span className="truncate mr-2">{item.label}</span>
                          <span className="bg-black text-white px-1 shrink-0">{item.status}</span>
                       </div>
                     ))}
                  </div>

                  <div className="border-t-2 border-black pt-2 md:pt-4 flex justify-between">
                     <div className="text-[8px] md:text-[10px] font-black opacity-50"></div>
                     <div className="text-[8px] md:text-[10px] font-black opacity-50"></div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Seksi Fitur Relevan */}
        <section className="mx-auto max-w-[1400px] border-x-0 md:border-x-2 border-b-2 border-black bg-black text-white py-16 md:py-24 px-6 lg:px-16">
           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-end mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
                Fitur <br className="hidden md:block" />Aplikasi
              </h2>
              <p className="max-w-md text-[10px] md:text-xs font-bold uppercase opacity-60">
                PENGELOLAAN DATA HIBURAN YANG TERSTRUKTUR DENGAN ANTARMUKA MINIMALIS DAN KECEPATAN AKSES MAKSIMAL MELALUI TEKNOLOGI CLOUD.
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'F 01', title: 'INPUT LINK', desc: 'Simpan link hiburan favorit Anda dari berbagai platform digital dengan sangat mudah.', color: 'bg-blue-600' },
                { id: 'F 02', title: 'PROGRES', desc: 'Pantau sejauh mana Anda menikmati hiburan dengan sistem status yang intuitif.', color: 'bg-yellow-400' },
                { id: 'F 03', title: 'CATATAN', desc: 'Tambahkan komentar atau ulasan singkat pada setiap item hiburan yang Anda simpan.', color: 'bg-red-500' },
                { id: 'F 04', title: 'KATEGORI', desc: 'Organisir koleksi berdasarkan tipe: Film, Game, Musik, atau kategori lainnya.', color: 'bg-emerald-500' }
              ].map((mod, i) => (
                <div key={i} className="border-2 border-white/20 p-6 md:p-8 hover:border-white transition-colors group">
                   <div className="flex justify-between items-center mb-8 md:mb-12">
                      <span className="text-[9px] md:text-[10px] font-black opacity-40">{mod.id}</span>
                      <div className={`h-2.5 w-2.5 ${mod.color} group-hover:scale-125 transition-transform`} />
                   </div>
                   <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase">{mod.title}</h4>
                   <p className="text-[10px] md:text-xs font-bold leading-relaxed opacity-60 uppercase">{mod.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Detail Teknis Aplikasi */}
        <section className="mx-auto max-w-[1400px] border-x-0 md:border-x-2 border-b-2 border-black grid grid-cols-1 lg:grid-cols-2">
           <div className="p-6 md:p-8 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8 underline decoration-4 underline-offset-8">DETAIL SISTEM</h3>
              <div className="space-y-4 md:space-y-6">
                 {[
                   { label: 'FRAMEWORK', val: 'NEXT.JS 16' },
                   { label: 'STORAGE', val: 'POSTGRESQL' },
                   { label: 'SECURITY', val: 'BCRYPT HASH' },
                   { label: 'ENGINE', val: 'SERVER ACT' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-end gap-2 md:gap-4">
                      <span className="text-[10px] md:text-xs font-black uppercase">{stat.label}</span>
                      <div className="flex-1 border-b-2 border-dotted border-black mb-1" />
                      <span className="text-xs md:text-sm font-black italic">{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="p-8 lg:p-16 flex flex-col justify-center bg-blue-600 text-white">
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 md:mb-6 leading-none">Akses Katalog</h3>
              <p className="text-[10px] md:text-xs font-bold uppercase mb-8 opacity-80">Mulai organisir daftar hiburan Anda dengan mendaftarkan akun atau masuk ke sistem hari ini.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link href="/login" className="flex-1">
                    <Button fullWidth variant="primary" className="shadow-none py-3">MASUK</Button>
                 </Link>
                 <Link href="/daftar" className="flex-1">
                    <Button fullWidth variant="primary" className="bg-blue-600 hover:bg-black border-black py-3 shadow-none">DAFTAR</Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer showDetails />
    </PageLayout>
  );
}
