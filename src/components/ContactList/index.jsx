import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getListContact } from '../../actions/actionContact';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import AddContact from '../AddContact';

function ContactList() {
  const { getListContactLoading, getListContactResult, getListContactError } = useSelector(
    (state) => state.ContactReducer
  );
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    dispatch(getListContact());
  }, [dispatch]);

  const getRomanNumber = (num) => {
    const romanNumerals = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII"
    ];
    return romanNumerals[num - 1] || num.toString();
  };

  const handleDelete = () => {
    if (selectedContact) {
      dispatch(deleteContact(selectedContact.id));
      onClose();
    }
  };

  const handleOpenDeleteModal = (contact) => {
    setSelectedContact(contact);
    onOpen();
  };

  return (
    <div>
      <AddContact />
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Tahun 2022 / 2023</TableCaption>
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Prodi</Th>
              <Th isNumeric>NIM</Th>
              <Th isNumeric>Semester</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {getListContactResult ? (
              getListContactResult.map((data) => (
                <Tr key={data.id}>
                  <Td>{data.name}</Td>
                  <Td>{data.prodi}</Td>
                  <Td isNumeric>{data.nim}</Td>
                  <Td isNumeric>{getRomanNumber(data.semester)}</Td>
                  <Td>
                    <Button size='xs' colorScheme='red' onClick={() => handleOpenDeleteModal(data)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : getListContactLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{getListContactError ? getListContactError : "Data kosong!"}</p>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
        <ModalContent>
          <ModalBody>
            <div>
              <h5 className='text-center mb-3'>
                Do you really want to delete this data?
              </h5>
            </div>
            <div className='flex justify-center items-center'>
              <Button colorScheme='gray' size='sm' mr={3} onClick={onClose}>
                No
              </Button>
              <Button colorScheme='red' size='sm' onClick={handleDelete}>
                Yes
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ContactList;
