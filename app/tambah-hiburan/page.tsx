"use client";

import { useState } from "react";
import { tambahHiburan } from "@/app/lib/actions";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function TambahHiburanPage() {
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ tipe?: string; nama?: string; link?: string; pemilik?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (formData: FormData) => {
    const errors: { tipe?: string; nama?: string; link?: string; pemilik?: string } = {};
    const tipe = formData.get("tipe") as string;
    const nama = formData.get("nama") as string;
    const link = formData.get("link") as string;
    const pemilik = formData.get("pemilik") as string;

    if (!tipe) errors.tipe = "TIPE TIDAK BOLEH KOSONG!";
    if (!nama) errors.nama = "NAMA TIDAK BOLEH KOSONG!";
    if (!link) errors.link = "LINK TIDAK BOLEH KOSONG!";
    if (!pemilik) errors.pemilik = "PEMILIK TIDAK BOLEH KOSONG!";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    
    if (!validate(formData)) return;

    setLoading(true);
    const result = await tambahHiburan(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Header 
        subtitle="SISTEM INPUT V.2 DATABASE HIBURAN" 
        rightElement={
          <Link href="/dashboard">
            <Button variant="secondary" className="py-1 px-3 text-[10px] md:text-sm">KE DASHBOARD</Button>
          </Link>
        }
      />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl border-2 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] my-8">
          <div className="mb-8 border-b-2 border-black pb-6">
            <div className="mb-4 inline-block border-2 border-black bg-yellow-300 px-2 py-0.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Formulir Input
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Tambah <br/><span className="text-blue-600">Hiburan</span> Baru</h1>
          </div>

          {error && (
            <div className="mb-6 border-2 border-black bg-red-100 p-3 text-[10px] md:text-xs font-bold uppercase text-red-600">
              [KESALAHAN SISTEM]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Tipe Modul"
                name="tipe"
                id="tipe"
                disabled={loading}
                error={fieldErrors.tipe}
                onChange={() => fieldErrors.tipe && setFieldErrors(prev => ({ ...prev, tipe: undefined }))}
                placeholder="Anime / Game / Film"
              />

              <Input
                label="Nama Item"
                name="nama"
                id="nama"
                disabled={loading}
                error={fieldErrors.nama}
                onChange={() => fieldErrors.nama && setFieldErrors(prev => ({ ...prev, nama: undefined }))}
                placeholder="One Piece / Elden Ring"
              />
            </div>

            <Input
              label="Tautan Sumber"
              name="link"
              id="link"
              disabled={loading}
              error={fieldErrors.link}
              onChange={() => fieldErrors.link && setFieldErrors(prev => ({ ...prev, link: undefined }))}
              placeholder="HTTPS://EXAMPLE.COM"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nama Pemilik"
                name="pemilik"
                id="pemilik"
                disabled={loading}
                error={fieldErrors.pemilik}
                onChange={() => fieldErrors.pemilik && setFieldErrors(prev => ({ ...prev, pemilik: undefined }))}
                placeholder="Franz / User 01"
              />

              <Select
                label="Status Progres"
                name="status"
                id="status"
                disabled={loading}
                options={[
                  { value: "belummulai", label: "BELUM MULAI" },
                  { value: "sedangdalamprogres", label: "SEDANG PROGRES" },
                  { value: "selesai", label: "SELESAI" },
                ]}
              />
            </div>

            <Input
              label="Catatan Komentar (Opsional)"
              name="komentar"
              id="komentar"
              as="textarea"
              disabled={loading}
              rows={3}
              placeholder="TAMBAHKAN CATATAN ATAU KOMENTAR..."
            />

            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t-2 border-black">
              <Button type="submit" disabled={loading} fullWidth variant="primary" className="shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                {loading ? "MENYIMPAN..." : "SIMPAN DATA"}
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button fullWidth variant="secondary">KEMBALI KE DASHBOARD</Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </PageLayout>
  );
}
