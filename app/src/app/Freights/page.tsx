"use client"

import { deleteRegister } from "../utils/deleteRegister"
import { updateRegister } from "../utils/updateRegister"
import useFreights from "./hooks/useFreights"

export default function Freights() {
  const {
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
  } = useFreights()

  const commonProps = {
    width: "25",
    height: "25",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }

  const valuesToUpdate = {
    product,
    product_wheight,
    vehicle,
    vehicle_wheight,
    kms
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-center text-2xl font-bold">Fretes</h1>

      <div className="flex items-center justify-between">
        <div>
          <label className="mb-1 block">Produto:</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block">Peso do Produto:</label>
          <input
            type="number"
            value={product_wheight}
            onChange={(e) => setProductWheight(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block">Veículo:</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block">Peso do Veículo:</label>
          <input
            type="number"
            value={vehicle_wheight}
            onChange={(e) => setVehicleWheight(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block">KMs:</label>
          <input
            type="number"
            value={kms}
            onChange={(e) => setKms(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={async () => await handleAddDeliveries()}
          className="mt-6 rounded-lg bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-600 "
        >
          {isEdit ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <table className="mt-8 w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2">Produto e Peso</th>
            <th className="px-4 py-2">Veículo e Peso</th>
            <th className="px-4 py-2">
              Cálculo (km * peso do produto * peso do veículo)
            </th>
            <th className="px-4 py-2">Valor do Frete</th>
            <th className="px-4 py-2">Valor do Entregador (taxa - frete)</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {deliveries?.map((item, index) => {
            if (item)
              return (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{`${item.product} - ${item.product_wheight} Kg`}</td>
                  <td className="border px-4 py-2 text-center">{`${item.vehicle} - ${item.vehicle_wheight} Kg`}</td>
                  <td className="border px-4 py-2 text-center">{`${item.kms} Km x ${item.product_wheight} Kg x ${item.vehicle_wheight} Kg`}</td>
                  <td className="border px-4 py-2 text-center">
                    R$ {item.freight.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    R$ {item.delivery_value.toFixed(2)}
                  </td>
                  <td className="flex w-24 justify-around py-2">
                    <button name="editButton" onClick={() => setStates(item)}>
                      <svg {...commonProps}>
                        <path d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1Zm-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83-6.94 6.93a1 1 0 0 0-.29.71Zm10.76-8.35 2.83 2.83-1.42 1.42-2.83-2.83ZM8 13.17l5.93-5.93 2.83 2.83L10.83 16H8Z" />
                      </svg>
                    </button>
                    <button
                      name="deleteButton"
                      onClick={async () =>
                        await deleteRegister(
                          "freights",
                          item.id,
                          setForceUpdate
                        )
                      }
                    >
                      <svg {...commonProps}>
                        <path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}
