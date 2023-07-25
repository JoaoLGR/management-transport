import useRegister from "@/app/hooks/useRegister"
import { deleteRegister } from "@/app/utils/deleteRegister"
import * as S from "./styles"
import { useState } from "react"
import { updateRegister } from "@/app/utils/updateRegister"

type TableProps = {
  title: string
  firstColumnName: string
  secondColumnName: string
  thirdColumnName: string
  firstRowName: string
  secondRowName: string
  thirdRowName: string
  requisition: Array<{ id: string; [key: string]: string }>
  setForceUpdate: React.Dispatch<React.SetStateAction<boolean>>
  routeName: string
  tableName: string
}

export function Table({
  title,
  requisition = [],
  firstColumnName,
  secondColumnName,
  thirdColumnName,
  firstRowName,
  secondRowName,
  thirdRowName,
  setForceUpdate,
  routeName,
  tableName
}: TableProps) {
  const {
    firstFieldValue,
    setFirstFieldValue,
    secondFieldValue,
    setSecondFieldValue,
    thirdFieldValue,
    setThirdFieldValue,
    handleSubmit
  } = useRegister(firstRowName, secondRowName, thirdRowName, routeName)

  const [isEdit, setIsEdit] = useState(false)
  const [idRegister, setIdRegister] = useState("")

  const commonProps = {
    width: "25",
    height: "25",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }

  const resetStates = () => {
    setFirstFieldValue("")
    setSecondFieldValue("")
    setThirdFieldValue("")
    setIdRegister("")
    setIsEdit(false)
  }

  const getFunction = async () => {
    if (isEdit) {
      await updateRegister(
        tableName,
        idRegister,
        {
          [firstRowName]: firstFieldValue,
          [secondRowName]: secondFieldValue,
          [thirdRowName]: thirdFieldValue
        },
        setForceUpdate
      )
      resetStates()
    } else {
      handleSubmit(setForceUpdate)
      resetStates()
    }
  }

  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.InputsSection>
        <S.Input
          value={firstFieldValue}
          onChange={(e) => setFirstFieldValue(e.target.value)}
          type="text"
          placeholder={firstColumnName}
        />
        <S.Input
          value={secondFieldValue}
          onChange={(e) => setSecondFieldValue(e.target.value)}
          type="text"
          placeholder={secondColumnName}
        />
        <S.Input
          value={thirdFieldValue}
          onChange={(e) => setThirdFieldValue(e.target.value)}
          type={title === "Usuários" ? "password" : "text"}
          placeholder={thirdColumnName}
        />
        <S.AddButton onClick={async () => await getFunction()}>
          {isEdit ? "Atualizar" : "Adicionar"}
        </S.AddButton>
      </S.InputsSection>

      <S.TableContent>
        <S.TableHeader>
          <S.TableRow>
            <S.TableHeaderCell>{firstColumnName}</S.TableHeaderCell>
            <S.TableHeaderCell>{secondColumnName}</S.TableHeaderCell>
            <S.TableHeaderCell>{thirdColumnName}</S.TableHeaderCell>
          </S.TableRow>
        </S.TableHeader>

        <S.TableBody>
          {requisition.map((item, index) => (
            <S.TableRow key={index} className="bg-gray-100">
              <S.TableDataCell>{item[firstRowName]}</S.TableDataCell>
              <S.TableDataCell>{item[secondRowName]}</S.TableDataCell>
              {title === "Usuários" && (
                <S.TableDataCell>
                  <input
                    className="w-20 bg-gray-100"
                    type="password"
                    value={item[thirdRowName]}
                  />
                </S.TableDataCell>
              )}
              {title !== "Usuários" && (
                <S.TableDataCell>{item[thirdRowName]}</S.TableDataCell>
              )}
              <S.TableDataCell className="flex justify-around">
                <button
                  name="editButton"
                  onClick={() => {
                    setFirstFieldValue(item[firstRowName])
                    setSecondFieldValue(item[secondRowName])
                    setThirdFieldValue(item[thirdRowName])
                    setIsEdit(true)
                    setIdRegister(item.id)
                  }}
                >
                  <svg {...commonProps}>
                    <path d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1Zm-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83-6.94 6.93a1 1 0 0 0-.29.71Zm10.76-8.35 2.83 2.83-1.42 1.42-2.83-2.83ZM8 13.17l5.93-5.93 2.83 2.83L10.83 16H8Z" />
                  </svg>
                </button>
                <button
                  name="deleteButton"
                  onClick={async () =>
                    await deleteRegister(tableName, item.id, setForceUpdate)
                  }
                >
                  <svg {...commonProps}>
                    <path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" />
                  </svg>
                </button>
              </S.TableDataCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.TableContent>
    </S.Container>
  )
}
