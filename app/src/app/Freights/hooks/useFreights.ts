import getData from "@/app/utils/getData"
import { updateRegister } from "@/app/utils/updateRegister"
import { it } from "node:test"
import { useEffect, useState } from "react"

interface DeliveryType {
  product: string
  product_wheight: string
  vehicle: string
  vehicle_wheight: string
  freight: number
  delivery_value: number
  kms: string
  id: string
}

export default function useFreights() {
  const [product, setProduct] = useState("")
  const [product_wheight, setProductWheight] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [vehicle_wheight, setVehicleWheight] = useState("")
  const [kms, setKms] = useState("")
  const [deliveries, setDeliveries] = useState<DeliveryType[]>([])

  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState("")
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    getData("freights").then((r) => {
      setDeliveries(r.freights)
    })
  }, [forceUpdate])

  const setStates = (item: DeliveryType) => {
    setId(item.id)
    setProduct(item.product)
    setProductWheight(item.product_wheight)
    setVehicle(item.vehicle)
    setVehicleWheight(item.vehicle_wheight)
    setKms(item.kms)
    setIsEdit(true)
  }

  const resetStates = () => {
    setId("")
    setProduct("")
    setProductWheight("")
    setVehicle("")
    setVehicleWheight("")
    setKms("")
    setIsEdit(false)
    setForceUpdate((s) => !s)
  }

  async function handleAddDeliveries() {
    try {
      const calculation =
        Number(kms) * Number(product_wheight) * Number(vehicle_wheight)
      const freight = calculation
      const rate =
        Number(kms) <= 100
          ? 0.05
          : Number(kms) > 100 && Number(kms) <= 200
          ? 0.07
          : Number(kms) > 200 && Number(kms) <= 500
          ? 0.09
          : 0.1
      const delivery_value = freight * rate

      const newDelivery = {
        product,
        product_wheight,
        vehicle,
        vehicle_wheight,
        kms,
        freight,
        rate,
        delivery_value
      }

      if (isEdit) {
        updateRegister("freights", id, newDelivery, setForceUpdate)
        resetStates()
      } else {
        const response = await fetch("http://localhost:3001/createFreight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDelivery)
        })

        const data = await response.json()

        if (!data.error) {
          setDeliveries([...deliveries, data.freight])
          resetStates()
        } else {
          console.error("Erro ao adicionar frete:", data.message)
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar frete:", error)
    }
  }

  return {
    product,
    setProduct,
    product_wheight,
    setProductWheight,
    vehicle,
    setVehicle,
    vehicle_wheight,
    setVehicleWheight,
    kms,
    setKms,
    deliveries,
    handleAddDeliveries,
    setForceUpdate,
    isEdit,
    setStates,
    id
  }
}
