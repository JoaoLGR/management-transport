import tw from "tailwind-styled-components"

export const Container = tw.div`
  flex
  min-h-screen
  flex-col
  items-center
  justify-center
  p-24
  w-full
  h-full
`

export const Title = tw.h1`
  font-bold
  text-2xl
  mb-4
`

export const InputsSection = tw.div`
  flex
  mb-4
  gap-2
`

export const Input = tw.input`
  border
  px-4
  py-2
  mr-2
`

export const AddButton = tw.button`
  px-4
  py-2
  bg-blue-500
  text-white
  font-bold
`

export const TableContent = tw.table`
  w-full 
  border
`

export const TableHeader = tw.thead``

export const TableBody = tw.tbody``

export const TableRow = tw.tr``

export const TableHeaderCell = tw.th`
  border
  px-4
  py-2
`

export const TableDataCell = tw.td`
  border
  px-4
  py-2
  text-center
`
