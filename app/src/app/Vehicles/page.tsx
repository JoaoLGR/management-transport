"use client"

import { useEffect, useState } from "react"
import getData from "../utils/getData"
import { Table } from "../components/Table"

export default function Vehicles() {
  if (!localStorage.getItem("token")) window.location.replace("/")

  const [vehicles, setVehicles] = useState([])
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    getData("vehicles").then((r) => {
      setVehicles(r.vehicles)
    })
  }, [forceUpdate])

  return (
    <div>
      <Table
        tableName="vehicles"
        routeName="createVehicle"
        setForceUpdate={setForceUpdate}
        title="Veículos"
        requisition={vehicles}
        firstColumnName="Nome do Veículo"
        secondColumnName="Tipo do Veículo"
        thirdColumnName="Peso máximo"
        firstRowName="vehicle_name"
        secondRowName="vehicle_type"
        thirdRowName="max_wheight"
      />
    </div>
  )
}
