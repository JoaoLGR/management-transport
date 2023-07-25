export default async function getData(tableName: string) {
  const response = await fetch(`http://localhost:3001/${tableName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  return response.json()
}
