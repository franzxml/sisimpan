import Link from "next/link";
import { getHiburan, logout } from "@/app/lib/actions";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { HiburanCard } from "./HiburanCard";

export default async function DashboardPage() {
  const hiburanList = await getHiburan();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "belummulai":
        return "BELUM MULAI";
      case "sedangdalamprogres":
        return "SEDANG PROGRES";
      case "selesai":
        return "SELESAI";
      default:
        return status.toUpperCase();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "belummulai":
        return "bg-gray-200 text-black";
      case "sedangdalamprogres":
        return "bg-blue-600 text-white";
      case "selesai":
        return "bg-emerald-500 text-black";
      default:
        return "bg-white text-black";
    }
  };

  const dashboardRightElement = (
    <div className="flex items-center gap-3">
      <Link href="/tambah-hiburan">
        <Button variant="warning" className="py-1 md:py-1.5 px-3 md:px-4 text-[10px] md:text-xs">
          + TAMBAH DATA
        </Button>
      </Link>
      <form action={logout}>
        <Button type="submit" variant="danger" className="py-1 md:py-1.5 px-3 md:px-4 text-[10px] md:text-xs">
          KELUAR SISTEM
        </Button>
      </form>
    </div>
  );

  return (
    <PageLayout>
      <Header 
        subtitle="DASHBOARD MANAJEMEN DATABASE HIBURAN" 
        rightElement={dashboardRightElement}
      />

      <main className="flex-1 p-6 md:p-12 lg:p-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 border-b-4 border-black pb-8">
            <div className="mb-4 inline-block border-2 border-black bg-blue-600 px-3 py-1 text-xs font-black text-white uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              PANEL UTAMA
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Dashboard <br />
              <span className="text-blue-600">Katalog</span> Pribadi
            </h1>
          </div>

          {hiburanList.length === 0 ? (
            <div className="border-4 border-black bg-white p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="mx-auto mb-6 h-16 w-16 border-4 border-dotted border-black opacity-20" />
              <p className="text-xl font-black uppercase opacity-50 italic">DATABASE KOSONG: BELUM ADA DATA YANG DITEMUKAN.</p>
              <Link href="/tambah-hiburan" className="mt-8 inline-block">
                <Button variant="secondary" className="px-8 py-4">INPUT DATA BARU</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hiburanList.map((item: any) => (
                <HiburanCard 
                  key={item.id} 
                  item={item} 
                  getStatusLabel={getStatusLabel} 
                  getStatusColor={getStatusColor} 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer statusText={`©franzxml | SISIMPAN OS LOG STAMP ${new Date().getFullYear()}`} />
    </PageLayout>
  );
}
