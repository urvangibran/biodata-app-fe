import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMahasiswa, detailMahasiswa, getAllMahasiswa, updateMahasiswa } from '../../actions/actionBiodata';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import totalMahasiswaProfile from '../../images/Vector.png'
import AddMahasiswa from '../AddMahasiswa';
import { TEInput } from 'tw-elements-react';

function ListMahasiswa() {
  const { getAllMahasiswaLoading, getAllMahasiswaResult, getAllMahasiswaError } = useSelector(
    (state) => state.BiodataMahasiswaReducer
  );
  const dispatch = useDispatch();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
  const [selectedContact, setSelectedContact] = useState(null);
  const [id, setId] = useState("")

  const { detailMahasiswaResult, updateMahasiswaResult } = useSelector(state => state.BiodataMahasiswaReducer);


  useEffect(() => {
    if (detailMahasiswaResult) {
      dispatch(getAllMahasiswa());
      setName(detailMahasiswaResult.name);
      setProdi(detailMahasiswaResult.prodi);
      setNim(detailMahasiswaResult.nim);
      setSemester(detailMahasiswaResult.semester);
      setId(detailMahasiswaResult.id);

    }
  }, [detailMahasiswaResult, dispatch]);

  useEffect(() => {
    dispatch(getAllMahasiswa());
  }, [dispatch]);

  useEffect(() => {
    if (updateMahasiswaResult) {
      dispatch(getAllMahasiswa());
      setName('');
      setProdi('');
      setNim('');
      setSemester('');
    }
  }, [updateMahasiswaResult, dispatch]);

  // modal edit
  const [name, setName] = useState('');
  const [prodi, setProdi] = useState('');
  const [nim, setNim] = useState('');
  const [semester, setSemester] = useState('');

  const isDataFilled = name && prodi && nim && semester;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isDataFilled && id) {
      dispatch(updateMahasiswa({ id, name, prodi, nim, semester }));
      onCloseEditModal();
    }
  };

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

  const totalMahasiswa = getAllMahasiswaResult.length

  const handleDelete = () => {
    if (selectedContact) {
      dispatch(deleteMahasiswa(selectedContact.id));
      onCloseDeleteModal();
    }
  };

  const handleOpenDeleteModal = (contact) => {
    setSelectedContact(contact);
    onOpenDeleteModal();
  };

  const handleOpenEditModal = (contact) => {
    dispatch(detailMahasiswa(contact))
    onOpenEditModal();
  }

  return (
    <div>
      <div className='mb-5'>
        <div className='grid place-items-center'>
          <div className='p-2 border-2 rounded-lg flex justify-center items-center'>
            <div className="image-total bg-[#E5DFDF] px-3 py-[14px] rounded-md mr-4 ">
              <img src={totalMahasiswaProfile} alt="" />
            </div>
            <div className="desc-total">
              <h3 className='text-[#ABA7A7] font-sans'>Total Mahasiswa</h3>
              <h3 className='font-semibold font-sans text-lg'> {totalMahasiswa} </h3>
            </div>
          </div>
        </div>
        <div className='mt-[-30px] '>
          <AddMahasiswa />
        </div>
      </div>
      <div className='max-h-[400px] overflow-auto'>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Tahun 2022 / 2023</TableCaption>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nama</Th>
                <Th>Prodi</Th>
                <Th isNumeric>NIM</Th>
                <Th isNumeric>Semester</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {getAllMahasiswaResult ? (
                getAllMahasiswaResult.map((data, idx) => (
                  <Tr key={data.id}>
                    <Td>{idx + 1}</Td>
                    <Td className='whitespace-pre-line max-w-xs'>{data.name}</Td>
                    <Td className='whitespace-pre-line max-w-xs'>{data.prodi}</Td>
                    <Td className='whitespace-pre-line max-w-xs' isNumeric>{data.nim}</Td>
                    <Td isNumeric>{getRomanNumber(data.semester)}</Td>
                    <Td>
                      <Button size='xs' colorScheme='red' onClick={() => handleOpenDeleteModal(data)}>
                        Delete
                      </Button>
                      <Button className='ml-4' size='xs' colorScheme='blue' onClick={() => handleOpenEditModal(data)}>
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : getAllMahasiswaLoading ? (
                <p>Loading...</p>
              ) : (
                <p>{getAllMahasiswaError ? getAllMahasiswaError : "Data kosong!"}</p>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
        <ModalContent>
          <ModalBody>
            <div>
              <h5 className='text-center mb-3'>
                Do you really want to delete this data?
              </h5>
            </div>
            <div className='flex justify-center items-center'>
              <Button colorScheme='gray' size='sm' mr={3} onClick={onCloseDeleteModal}>
                No
              </Button>
              <Button colorScheme='red' size='sm' onClick={handleDelete}>
                Yes
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={onCloseEditModal}>
        <Modal isOpen={isEditModalOpen} onClose={onCloseEditModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Form Edit Biodata Mahasiswa</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <TEInput className='mb-8' type="text" id='name' label='Nama' name='name' value={name} onChange={(event) => setName(event.target.value)} />
                <TEInput className='my-8' type="text" id='prodi' label='Program Studi' name='prodi' value={prodi} onChange={(event) => setProdi(event.target.value)} />
                <TEInput className='my-8' type="text" id='nim' label='Nim' name='nim' value={nim} onChange={(event) => setNim(event.target.value)} />
                <TEInput className='mt-8' type="number" id='semester' label='Semester' name='semester' value={semester} onChange={(event) => setSemester(event.target.value)} />
                <div className='flex justify-end mt-3 mb-2'>
                  <Button mr={3} onClick={onCloseEditModal}>
                    Close
                  </Button>
                  <Button className='border-1 border-black' type='submit' colorScheme='blue' disabled={!isDataFilled}>
                    Submit
                  </Button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Modal>
    </div>
  );
}

export default ListMahasiswa;
