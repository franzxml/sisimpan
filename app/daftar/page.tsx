"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/app/lib/actions";
import { PageLayout } from "@/components/PageLayout";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (formData: FormData) => {
    const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name) errors.name = "NAMA TIDAK BOLEH KOSONG!";
    if (!email) {
      errors.email = "EMAIL TIDAK BOLEH KOSONG!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "FORMAT EMAIL TIDAK VALID!";
    }
    
    if (!password) {
      errors.password = "KATA SANDI TIDAK BOLEH KOSONG!";
    } else if (password.length < 6) {
      errors.password = "MINIMAL 6 KARAKTER!";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "KATA SANDI TIDAK COCOK!";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    
    if (!validate(formData)) return;

    setIsLoading(true);
    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md border-2 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] my-8">
          <div className="mb-8 border-b-2 border-black pb-6">
            <div className="mb-4 inline-block border-2 border-black bg-yellow-300 px-2 py-0.5 text-[10px] font-black uppercase">
              Registrasi Sistem
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Buat <br/><span className="text-blue-600">Akun</span></h1>
          </div>

          {error && (
            <div className="mb-6 border-2 border-black bg-red-100 p-3 text-[10px] md:text-xs font-bold uppercase text-red-600">
              [SYSTEM ERROR]: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              disabled={isLoading}
              error={fieldErrors.name}
              onChange={() => fieldErrors.name && setFieldErrors(prev => ({ ...prev, name: undefined }))}
              placeholder="Nama Lengkap Anda"
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              disabled={isLoading}
              error={fieldErrors.email}
              onChange={() => fieldErrors.email && setFieldErrors(prev => ({ ...prev, email: undefined }))}
              placeholder="nama@email.com"
            />

            <Input
              label="Password Key"
              name="password"
              type="password"
              disabled={isLoading}
              error={fieldErrors.password}
              onChange={() => fieldErrors.password && setFieldErrors(prev => ({ ...prev, password: undefined }))}
              placeholder="••••••••"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              disabled={isLoading}
              error={fieldErrors.confirmPassword}
              onChange={() => fieldErrors.confirmPassword && setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }))}
              placeholder="••••••••"
            />

            <Button type="submit" disabled={isLoading} fullWidth variant="primary">
              {isLoading ? "MENDAFTARKAN..." : "BUAT AKUN SEKARANG"}
            </Button>
          </form>

          <div className="mt-8 border-t-2 border-black pt-6 text-center">
            <p className="text-[10px] md:text-xs font-bold uppercase">
              Sudah memiliki akses?{" "}
              <Link href="/login" className="font-black text-blue-600 hover:underline">
                MASUK DI SINI
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
