"use client";

import { useState } from "react";
import { editHiburan } from "@/app/lib/actions";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

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
    if (!link) {
      errors.link = "LINK TIDAK BOLEH KOSONG!";
    } else {
        try { new URL(link); } catch { errors.link = "FORMAT URL TIDAK VALID!"; }
    }
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
    const result = await editHiburan(id, formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-black">
      {error && (
        <div className="mb-6 border-2 border-black bg-red-100 p-3 text-[10px] md:text-xs font-black uppercase text-red-600">
          [SYSTEM ERROR]: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Module Type"
          name="tipe"
          id="tipe"
          defaultValue={item.tipe}
          disabled={loading}
          error={fieldErrors.tipe}
          onChange={() => fieldErrors.tipe && setFieldErrors(prev => ({ ...prev, tipe: undefined }))}
          placeholder="Anime / Game / Movie"
        />

        <Input
          label="Item Name"
          name="nama"
          id="nama"
          defaultValue={item.nama}
          disabled={loading}
          error={fieldErrors.nama}
          onChange={() => fieldErrors.nama && setFieldErrors(prev => ({ ...prev, nama: undefined }))}
          placeholder="One Piece / Elden Ring"
        />
      </div>

      <Input
        label="Source Link"
        name="link"
        id="link"
        type="url"
        defaultValue={item.link}
        disabled={loading}
        error={fieldErrors.link}
        onChange={() => fieldErrors.link && setFieldErrors(prev => ({ ...prev, link: undefined }))}
        placeholder="HTTPS://EXAMPLE.COM"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Owner Sign"
          name="pemilik"
          id="pemilik"
          defaultValue={item.pemilik}
          disabled={loading}
          error={fieldErrors.pemilik}
          onChange={() => fieldErrors.pemilik && setFieldErrors(prev => ({ ...prev, pemilik: undefined }))}
          placeholder="Franz / User 01"
        />

        <Select
          label="Progress Status"
          name="status"
          id="status"
          defaultValue={item.status}
          disabled={loading}
          options={[
            { value: "belummulai", label: "BELUM MULAI" },
            { value: "sedangdalamprogres", label: "SEDANG PROGRES" },
            { value: "selesai", label: "SELESAI" },
          ]}
        />
      </div>

      <Input
        label="Log Comment (Optional)"
        name="komentar"
        id="komentar"
        as="textarea"
        defaultValue={item.komentar}
        disabled={loading}
        rows={3}
        placeholder="TAMBAHKAN CATATAN ATAU KOMENTAR..."
      />

      <div className="flex flex-col md:flex-row gap-4 pt-6 border-t-2 border-black">
        <Button type="submit" disabled={loading} fullWidth variant="success">
          {loading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
        </Button>
        <Link href="/dashboard" className="flex-1">
          <Button fullWidth variant="secondary">BATAL MODIFIKASI</Button>
        </Link>
      </div>
    </form>
  );
}
