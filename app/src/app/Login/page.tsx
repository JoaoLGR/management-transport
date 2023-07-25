"use client"

import useAuth from "../hooks/useAuth"

export default function Login() {
  const { email, setEmail, password, setPassword, handleSubmit } = useAuth()

  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <div className="w-72 rounded-lg bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block">Email:</label>
            <input
              id="email"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block">Senha:</label>
            <input
              id="password"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
