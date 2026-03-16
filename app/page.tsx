import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F4] text-black selection:bg-black selection:text-white font-mono overflow-x-hidden">
      {/* Sistem Kisi Latar Belakang */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header Industrial */}
      <header className="sticky top-0 z-50 border-b-2 border-black bg-[#F4F4F4] px-4 md:px-6 py-3 md:py-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-2 border-black bg-black px-2 py-0.5 md:py-1 text-white font-black text-xs md:text-sm">
              SISIMPAN_V1.0
            </div>
            <div className="hidden sm:block text-[9px] md:text-[10px] font-bold uppercase tracking-tighter opacity-40 leading-none">
              MODUL: KATALOG_DASHBOARD <br />
              STATUS: TERKONEKSI
            </div>
          </div>
          
          <nav className="flex items-center gap-1 border-2 border-black p-0.5 md:p-1 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Link href="/login" className="px-2 md:px-4 py-1 hover:bg-black hover:text-white transition-colors text-[10px] md:text-sm font-bold">MASUK</Link>
            <div className="w-[1px] md:w-[2px] h-3 md:h-4 bg-black/20" />
            <Link href="/daftar" className="px-2 md:px-4 py-1 bg-black text-white hover:bg-white hover:text-black transition-all text-[10px] md:text-sm font-bold">DAFTAR</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-[1400px] border-x-0 md:border-x-2 border-black min-h-[auto] md:min-h-[80vh] flex flex-col lg:flex-row">
          {/* Kolom Kiri: Headline */}
          <div className="flex-1 p-6 md:p-8 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-center">
            <div className="mb-6 md:mb-8 inline-block self-start border-2 border-black bg-yellow-300 px-3 py-1 text-[10px] md:text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              FUNGSI: MANAJEMEN_KOLEKSI
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8 md:mb-12">
              Katalog <br />
              <span className="text-blue-600">Hiburan</span> <br />
              Personal
            </h1>
            <p className="max-w-md text-xs md:text-sm font-bold leading-relaxed mb-10 md:mb-12 uppercase">
              // SISIMPAN ADALAH APLIKASI UNTUK MENCATAT DAN MENGELOLA DAFTAR HIBURAN ANDA. 
              // SIMPAN LINK FILM, GAME, ATAU MUSIK DALAM SATU TEMPAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="group relative border-2 border-black bg-black px-6 md:px-8 py-3 md:py-4 text-center text-white font-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]">
                BUKA_DASHBOARD_
              </Link>
              <Link href="/daftar" className="border-2 border-black px-6 md:px-8 py-3 md:py-4 text-center font-black hover:bg-black hover:text-white transition-all">
                BUAT_AKUN_BARU
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Visualisator Dashboard */}
          <div className="flex-1 bg-white p-6 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden group">
            <div className="relative w-full max-w-[400px] lg:max-w-none aspect-square border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center p-6 md:p-12">
               <div className="absolute top-2 left-2 text-[7px] md:text-[9px] font-bold opacity-30 uppercase tracking-tighter">PREVIEW_ANTARMUKA</div>
               <div className="absolute inset-0 border-2 border-black/10 m-6 md:m-12 rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
               
               <div className="relative z-10 w-full h-full border-2 border-black bg-[#F4F4F4] p-4 md:p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="h-8 md:h-12 w-8 md:w-12 border-2 border-black bg-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                    <div className="text-right">
                       <div className="text-[7px] md:text-[8px] font-black uppercase">STATUS_SISTEM</div>
                       <div className="text-sm md:text-xl font-black leading-none">SIAP</div>
                    </div>
                  </div>
                  
                  {/* Visualisasi List Hiburan */}
                  <div className="space-y-2 md:space-y-3">
                     {[
                       { label: 'Film: Inception', status: 'OK' },
                       { label: 'Game: Elden Ring', status: 'DEV' },
                       { label: 'Musik: Lofi Girl', status: 'NEW' }
                     ].map((item, i) => (
                       <div key={i} className="border-2 border-black bg-white p-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center text-[8px] md:text-[10px] font-black">
                          <span className="truncate mr-2">{item.label}</span>
                          <span className="bg-black text-white px-1 shrink-0">{item.status}</span>
                       </div>
                     ))}
                  </div>

                  <div className="border-t-2 border-black pt-2 md:pt-4 flex justify-between">
                     <div className="text-[8px] md:text-[10px] font-black opacity-50">NEON_DB</div>
                     <div className="text-[8px] md:text-[10px] font-black opacity-50">V1.0.0</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Seksi Fitur Relevan */}
        <section className="mx-auto max-w-[1400px] border-x-0 md:border-x-2 border-b-2 border-black bg-black text-white py-16 md:py-24 px-6 lg:px-16">
           <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-end mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
                Fitur <br className="hidden md:block" />Aplikasi.
              </h2>
              <p className="max-w-md text-[10px] md:text-xs font-bold uppercase opacity-60">
                PENGELOLAAN DATA HIBURAN YANG TERSTRUKTUR DENGAN ANTARMUKA MINIMALIS DAN KECEPATAN AKSES MAKSIMAL MELALUI TEKNOLOGI CLOUD.
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'F_01', title: 'INPUT_LINK', desc: 'Simpan link hiburan favorit Anda dari berbagai platform digital dengan sangat mudah.', color: 'bg-blue-600' },
                { id: 'F_02', title: 'PROGRES', desc: 'Pantau sejauh mana Anda menikmati hiburan dengan sistem status yang intuitif.', color: 'bg-yellow-400' },
                { id: 'F_03', title: 'CATATAN', desc: 'Tambahkan komentar atau ulasan singkat pada setiap item hiburan yang Anda simpan.', color: 'bg-red-500' },
                { id: 'F_04', title: 'KATEGORI', desc: 'Organisir koleksi berdasarkan tipe: Film, Game, Musik, atau kategori lainnya.', color: 'bg-emerald-500' }
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
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8 underline decoration-4 underline-offset-8">DETAIL_SISTEM</h3>
              <div className="space-y-4 md:space-y-6">
                 {[
                   { label: 'FRAMEWORK', val: 'NEXT.JS_16' },
                   { label: 'STORAGE', val: 'POSTGRESQL' },
                   { label: 'SECURITY', val: 'BCRYPT_HASH' },
                   { label: 'ENGINE', val: 'SERVER_ACT' }
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
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 md:mb-6 leading-none">Akses_Katalog</h3>
              <p className="text-[10px] md:text-xs font-bold uppercase mb-8 opacity-80">Mulai organisir daftar hiburan Anda dengan mendaftarkan akun atau masuk ke sistem hari ini.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link href="/login" className="flex-1 bg-black p-3 md:p-4 text-center text-xs md:text-sm font-black hover:bg-white hover:text-black transition-all">
                    LOGIN
                 </Link>
                 <Link href="/daftar" className="flex-1 border-2 border-black p-3 md:p-4 text-center text-xs md:text-sm font-black hover:bg-black transition-all">
                    DAFTAR
                 </Link>
              </div>
           </div>
        </section>
      </main>

      {/* Footer Industrial */}
      <footer className="mx-auto w-full max-w-[1400px] border-x-0 md:border-x-2 border-black bg-white p-6 md:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="sm:col-span-2">
            <div className="text-xl md:text-2xl font-black mb-4 md:mb-6">SISIMPAN_CORE</div>
            <p className="max-w-md text-[9px] md:text-[10px] font-black uppercase leading-relaxed opacity-50">
              SISIMPAN ADALAH PROYEK OPEN-SOURCE UNTUK MANAJEMEN KOLEKSI DIGITAL. SELURUH DATA DISIMPAN SECARA AMAN PADA INFRASTRUKTUR CLOUD NEON POSTGRESQL.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-xs font-black border-b-2 border-black pb-2 uppercase">Menu_Navigasi</div>
            <ul className="space-y-2 text-[10px] font-black uppercase">
               <li><Link href="/dashboard" className="hover:underline hover:text-blue-600">Akses_Dashboard</Link></li>
               <li><Link href="/tambah-hiburan" className="hover:underline hover:text-blue-600">Tambah_Koleksi</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-xs font-black border-b-2 border-black pb-2 uppercase">Informasi</div>
            <ul className="space-y-2 text-[10px] font-black uppercase">
               <li><Link href="/login" className="hover:underline hover:text-blue-600">Halaman_Masuk</Link></li>
               <li><Link href="/daftar" className="hover:underline hover:text-blue-600">Halaman_Daftar</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-[9px] md:text-[10px] font-black uppercase text-center md:text-left">© 2024 SISIMPAN_LABS // KELOLA HIBURAN ANDA SECARA PROFESIONAL</div>
           <div className="flex gap-4 md:gap-6">
              <div className="h-3 md:h-4 w-3 md:w-4 bg-black" />
              <div className="h-3 md:h-4 w-3 md:w-4 bg-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              <div className="h-3 md:h-4 w-3 md:w-4 bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
           </div>
        </div>
      </footer>
    </div>
  );
}
