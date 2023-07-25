"use client"

import { useEffect, useState } from "react"
import getData from "../utils/getData"
import { Table } from "../components/Table"

export default function Users() {
  if (!localStorage.getItem("token")) window.location.replace("/")

  const [users, setUsers] = useState([])
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    getData("users").then((r) => {
      console.log(r)

      setUsers(r.users)
    })
  }, [forceUpdate])

  return (
    <div>
      <Table
        tableName="users"
        routeName="createUser"
        setForceUpdate={setForceUpdate}
        title="Usuários"
        requisition={users}
        firstColumnName="Email"
        secondColumnName="Nome de Usuário"
        thirdColumnName="Senha"
        firstRowName="email"
        secondRowName="user_name"
        thirdRowName="password"
      />
    </div>
  )
}
