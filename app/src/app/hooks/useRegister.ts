import React, { useState } from "react"

export default function useRegister(
  firstFieldName: string,
  secondFieldName: string,
  thirdFieldName: string,
  routeName: string
) {
  const [firstFieldValue, setFirstFieldValue] = useState("")
  const [secondFieldValue, setSecondFieldValue] = useState("")
  const [thirdFieldValue, setThirdFieldValue] = useState("")

  const handleSubmit = async (
    setForceUpdate?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await fetch(`http://localhost:3001/${routeName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          [firstFieldName]: firstFieldValue,
          [secondFieldName]: secondFieldValue,
          [thirdFieldName]: thirdFieldValue
        })
      })

      if (response.ok) {
        if (setForceUpdate) setForceUpdate((s) => !s)
        else window.location.replace("/Login")
        alert("Registro criado com sucesso!")
      } else {
        const data = await response.json()
        alert(
          data.mensagem || "Erro ao criar registro. Por favor, tente novamente."
        )
      }
    } catch (error) {
      console.error("Erro ao criar registro:", error)
    }
  }

  return {
    firstFieldValue,
    setFirstFieldValue,
    secondFieldValue,
    setSecondFieldValue,
    thirdFieldValue,
    setThirdFieldValue,
    handleSubmit
  }
}
