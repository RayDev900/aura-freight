'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Clock3, MonitorSmartphone, Globe2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Usuario o contraseña incorrectos');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
     <div
        className="relative flex min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/rd_digital 2.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#070b1a]/10" />
    
        <div className="relative z-10 flex w-full">
    
          <div className="flex w-full items-center lg:w-2/5 px-16">
            <div className="w-full max-w-md">
    
              <div className="mb-10">
                <h1 className="text-5xl font-bold text-white">
                  Aura Freight
                </h1>
    
                <p className="mt-2 text-lg text-slate-300">
                  Ecosistema de logística regional
                </p>
              </div>
    
              <div className="rounded-2xl border border-white/10 bg-[#0f172acc]/70 backdrop-blur-xl p-8 shadow-2xl">
    
                <h2 className="text-3xl font-bold text-white">
                  Control de Acceso
                </h2>
    
                <p className="mt-2 text-slate-400">
                  Ingrese sus credenciales para acceder a su cuenta.
                </p>
    
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
    
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Email
                    </label>
    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@empresa.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
    
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Contraseña
                    </label>
    
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
    
                  {error && (
                    <p className="text-red-400">
                      {error}
                    </p>
                  )}
    
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </button>
    
                </form>
    
              </div>
    
            </div>
          </div>
    
          <div className="hidden lg:block flex-1"></div>
    
        </div>
    
        <div className="absolute bottom-10 right-16 z-20">
          <div className="flex gap-5">
    
            <div className="w-36 rounded-2xl border border-white/10 bg-[#0f172acc]/70 backdrop-blur-xl p-5 shadow-xl">
              <Clock3 className="mb-3 h-7 w-7 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">24/7</h3>
              <p className="text-sm text-slate-400">Operación</p>
            </div>
    
            <div className="w-36 rounded-2xl border border-white/10 bg-[#0f172acc]/70 backdrop-blur-xl p-5 shadow-xl">
              <MonitorSmartphone className="mb-3 h-7 w-7 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">100%</h3>
              <p className="text-sm text-slate-400">Digital</p>
            </div>
    
            <div className="w-36 rounded-2xl border border-white/10 bg-[#0f172acc]/70 backdrop-blur-xl p-5 shadow-xl">
              <Globe2 className="mb-3 h-7 w-7 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">ERP</h3>
              <p className="text-sm text-slate-400">Regional</p>
            </div>
    
          </div>
        </div>
    
      </div>
    );
}