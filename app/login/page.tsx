"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/app/lib/actions";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = "EMAIL TIDAK BOLEH KOSONG!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "FORMAT EMAIL TIDAK VALID!";
    }
    
    if (!password) {
      errors.password = "KATA SANDI TIDAK BOLEH KOSONG!";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validate()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md border-2 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-8 border-b-2 border-black pb-6">
            <div className="mb-4 inline-block border-2 border-black bg-yellow-300 px-2 py-0.5 text-[10px] font-black uppercase">
              Otentikasi Sistem
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Masuk <br/><span className="text-blue-600">Akun</span></h1>
          </div>

          {error && (
            <div className="mb-6 border-2 border-black bg-red-100 p-3 text-[10px] md:text-xs font-bold uppercase text-red-600">
              [SYSTEM ERROR]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              error={fieldErrors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
              }}
              disabled={loading}
              placeholder="nama@email.com"
            />

            <div className="space-y-1">
              <Input
                label="Password Key"
                type="password"
                value={password}
                error={fieldErrors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                }}
                disabled={loading}
                placeholder="••••••••"
              />
              <div className="text-right">
                <a 
                  href="mailto:ignfranzx@gmail.com?subject=Permintaan%20Ubah%20Kata%20Sandi%20Sisimpan&body=Halo%2C%20saya%20ingin%20meminta%20perubahan%20kata%20sandi%20untuk%20akun%20Sisimpan%20saya."
                  className="text-[10px] font-black uppercase text-blue-600 hover:underline"
                >
                  [Lupa Sandi?]
                </a>
              </div>
            </div>

            <Button type="submit" disabled={loading} fullWidth variant="primary">
              {loading ? "MEMPROSES..." : "AKSES DASHBOARD"}
            </Button>
          </form>

          <div className="mt-8 border-t-2 border-black pt-6 text-center">
            <p className="text-[10px] md:text-xs font-bold uppercase">
              Belum terdaftar?{" "}
              <Link href="/daftar" className="font-black text-blue-600 hover:underline">
                BUAT AKUN BARU
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
