export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold">Bem-Vindo!</h1>
        <p className="mb-4 text-xl">Você já possui login?</p>
        <div className="space-x-4">
          <a
            href="/Login"
            className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Sim
          </a>
          <a
            href="/Register"
            className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
          >
            Não
          </a>
        </div>
      </div>
    </main>
  )
}
