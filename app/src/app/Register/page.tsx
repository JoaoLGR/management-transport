"use client"

import useRegister from "@/app/hooks/useRegister"

export default function Register() {
  const {
    firstFieldValue,
    setFirstFieldValue,
    secondFieldValue,
    setSecondFieldValue,
    thirdFieldValue,
    setThirdFieldValue,
    handleSubmit
  } = useRegister("email", "user_name", "password", "createUser")

  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Crie seu usuário</h2>
      <div className="w-72 rounded-lg bg-white p-8 shadow-md">
        <form onSubmit={() => handleSubmit()} className="space-y-4">
          <div>
            <label className="mb-1 block">Email:</label>
            <input
              id="email"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="text"
              value={firstFieldValue}
              onChange={(e) => setFirstFieldValue(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block">Usuário:</label>
            <input
              id="user_name"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="text"
              value={secondFieldValue}
              onChange={(e) => setSecondFieldValue(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block">Senha:</label>
            <input
              id="password"
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="password"
              value={thirdFieldValue}
              onChange={(e) => setThirdFieldValue(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
          >
            Criar usuário
          </button>
        </form>
      </div>
    </div>
  )
}
