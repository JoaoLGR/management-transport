"use client"

import { useEffect, useState } from "react"
import getData from "../utils/getData"
import { Table } from "../components/Table"

export default function Products() {
  if (!localStorage.getItem("token")) window.location.replace("/")

  const [products, setProducts] = useState([])
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    getData("products").then((r) => {
      setProducts(r.products)
    })
  }, [forceUpdate])

  return (
    <div>
      <Table
        tableName="products"
        routeName="createProduct"
        setForceUpdate={setForceUpdate}
        title="Produtos"
        requisition={products}
        firstColumnName="Nome do Produto"
        secondColumnName="Tipo do Produto"
        thirdColumnName="Peso do Produto"
        firstRowName="product_name"
        secondRowName="product_type"
        thirdRowName="product_wheight"
      />
    </div>
  )
}
