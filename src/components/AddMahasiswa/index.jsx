import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { TEInput } from "tw-elements-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMahasiswa, getAllMahasiswa } from '../../actions/actionBiodata';

function AddMahasiswa() {
  const [name, setName] = useState('');
  const [prodi, setProdi] = useState('');
  const [nim, setNim] = useState('');
  const [semester, setSemester] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { addMahasiswaResult, deleteMahasiswaResult } = useSelector(state => state.BiodataMahasiswaReducer);

  const isDataFilled = name && prodi && nim && semester;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isDataFilled) {
      dispatch(addMahasiswa({ name, prodi, nim, semester }));
      onClose();
    }
  };

  useEffect(() => {
    if (addMahasiswaResult) {
      dispatch(getAllMahasiswa());
      setName('');
      setProdi('');
      setNim('');
      setSemester('');
    }
  }, [addMahasiswaResult, dispatch]);

  useEffect(() => {
    if (deleteMahasiswaResult) {
      dispatch(getAllMahasiswa());
    }
  }, [deleteMahasiswaResult, dispatch]);

  return (
    <div>
      <div className='flex justify-end mr-5'>
        <Button size='sm' onClick={onOpen}>Add Data <span className='mb-1 ml-1 font-bold text-xl'>+</span></Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Add Biodata Mahasiswa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <TEInput className='mb-8' type="text" id='name' label='Nama' name='name' value={name} onChange={(event) => setName(event.target.value)} />
              <TEInput className='my-8' type="text" id='prodi' label='Program Studi' name='prodi' value={prodi} onChange={(event) => setProdi(event.target.value)} />
              <TEInput className='my-8' type="text" id='nim' label='Nim' name='nim' value={nim} onChange={(event) => setNim(event.target.value)} />
              <TEInput className='mt-8' type="number" id='semester' label='Semester' name='semester' value={semester} onChange={(event) => setSemester(event.target.value)} />
              <div className='flex justify-end mt-3 mb-2'>
                <Button mr={3} onClick={onClose}>
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
    </div>
  );
}

export default AddMahasiswa;
