export const deleteRegister = async (
  tableName: string,
  id: string,
  setForceUpdate: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const isConfirmed = window.confirm(
    "Deseja realmente excluir o registro?\nEssa ação não pode ser desfeita."
  )

  if (isConfirmed) {
    try {
      const response = await fetch(`http://localhost:3001/${tableName}/${id}`, {
        method: "DELETE"
      })

      const data = await response.json()
      if (response.ok) {
        setForceUpdate((s) => !s)
      } else {
        console.error("Erro ao deletar registro:", data.mensagem)
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição no banco de dados:", error)
    }
  }
}
