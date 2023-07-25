export default function Menu() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-bold">Menu</h1>
        <ul className="space-y-4">
          <li>
            <a href="/Products" className="text-blue-500 hover:underline">
              Acessar Produtos
            </a>
          </li>
          <li>
            <a href="/Users" className="text-blue-500 hover:underline">
              Acessar Usuários
            </a>
          </li>
          <li>
            <a href="/Vehicles" className="text-blue-500 hover:underline">
              Acessar Veículos
            </a>
          </li>
          <li>
            <a href="/Freights" className="text-blue-500 hover:underline">
              Acessar Fretes
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
