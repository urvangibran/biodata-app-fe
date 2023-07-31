import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListContact } from '../../actions/actionContact'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import AddContact from '../AddContact'

function ContactList() {
  const { getListContactLoading, getListContactResult, getListContactError } = useSelector((state) => state.ContactReducer)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getListContact())

  }, [dispatch])

  const getRomanNumber = (num) => {
    return num == 1
      ? "I"
      : num == 2
        ? "II"
        : num == 3
          ? "III"
          : num == 4
            ? "IV"
            : num == 5
              ? "V"
              : num == 6
                ? "VI"
                : num == 7
                  ? "VII"
                  : num == 8
                    ? "VIII"
                    : num;
  }

  return (
    <div>
      <AddContact/>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Tahun 2022 / 2023</TableCaption>
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Prodi</Th>
              <Th isNumeric>NIM</Th>
              <Th isNumeric>Semester</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getListContactResult ? (
              getListContactResult.map((datas) => {
                return (
                  <Tr>
                    <Td> {datas.name} </Td>
                    <Td>{datas.prodi}</Td>
                    <Td isNumeric>{datas.nim}</Td>
                    <Td isNumeric>{getRomanNumber(datas.semester)}</Td>
                  </Tr>
                )
              })
            ) : getListContactLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{getListContactError ? getListContactError : "Data kosong!"}</p>
            )}

          </Tbody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default ContactList