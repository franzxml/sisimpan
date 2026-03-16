"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/app/lib/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">Masuk</h1>
          <p className="mt-2 text-gray-600">Silakan masuk ke akun Sisimpan Anda.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
              <a 
                href="mailto:ignfranzx@gmail.com?subject=Permintaan%20Ubah%20Kata%20Sandi%20Sisimpan&body=Halo%2C%20saya%20ingin%20meminta%20perubahan%20kata%20sandi%20untuk%20akun%20Sisimpan%20saya."
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Lupa kata sandi?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:bg-blue-400"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/daftar" className="font-semibold text-blue-600 hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </main>
  );
}
