'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    <div className="flex min-h-screen bg-[#070b1a]">
      {/* IZQUIERDA */}
      <div className="relative z-10 flex w-full items-center justify-center px-8 lg:w-2/5">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white">
              Aura Freight
            </h1>

            <p className="mt-2 text-slate-400">
              Ecosistema de logística regional
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white">
              Control de Acceso
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Ingrese sus credenciales para acceder a su cuenta
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-slate-300"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="correo@empresa.com"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-900/60
                    px-4
                    py-3
                    text-white
                    placeholder:text-slate-500
                    focus:border-violet-500
                    focus:outline-none
                  "
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-slate-300"
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-900/60
                    px-4
                    py-3
                    text-white
                    placeholder:text-slate-500
                    focus:border-violet-500
                    focus:outline-none
                  "
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-lg
                  bg-violet-600
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-violet-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* DERECHA */}
      <div className="relative hidden lg:block lg:w-3/5">
        {/* Imagen */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/img/rd_digital.png')",
          }}
        />

        {/* Oscurece un poco la imagen */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Degradado hacia el login */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b1a] via-[#070b1acc] to-transparent" />

        {/* Texto decorativo */}
        <div className="absolute bottom-16 left-16 max-w-xl">
          <h2 className="text-5xl font-bold leading-tight text-white">
            Gestión logística inteligente
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            Optimiza operaciones, monitorea envíos y centraliza
            toda la información de tu cadena logística desde un
            solo lugar.
          </p>
        </div>
      </div>
    </div>
  );
}