export async function updateRegister(
  tableName: string,
  id: string,
  newData: object,
  setForceUpdate: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log(newData)

  try {
    const response = await fetch(`http://localhost:3001/${tableName}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    })

    const data = await response.json()
    if (response.ok) {
      setForceUpdate((s) => !s)
    } else {
      console.error("Erro ao editar registro:", data.mensagem)
    }
  } catch (error) {
    console.error("Erro ao fazer a requisição no banco de dados:", error)
  }
}
