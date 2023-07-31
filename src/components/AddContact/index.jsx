import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact, getListContact } from '../../actions/actionContact'

function AddContact() {
    const [name, setName] = useState('')
    const [prodi, setProdi] = useState('')
    const [nim, setNim] = useState('')
    const [semester, setSemester] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const { addContactResult } = useSelector(state => state.ContactReducer)

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(addContact({ name: name, prodi: prodi, nim: nim, semester: semester }))
    }

    useEffect(() => {
        if (addContactResult) {
            dispatch(getListContact())
            setName('')
            setProdi('')
            setNim('')
            setSemester('')
        }
    }, [addContactResult, dispatch])

    return (
        <div>
            <div className='flex justify-end mr-5'>
                <Button size='sm' onClick={onOpen}>Add Data <span className='mb-1 ml-1 font-bold text-xl'>+</span> </Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Form Input Biodata Mahasiswa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form className='' action="" onSubmit={(event) => handleSubmit(event)}>
                            <label htmlFor="name">Nama</label>
                            <input className='w-full border-2 border-black rounded-sm m-1' type="text" name='name' placeholder='Nama . . .' value={name} onChange={(event) => setName(event.target.value)} />
                            <label htmlFor="prodi">Program Studi</label>
                            <input className='w-full border-2 border-black rounded-sm m-1' type="text" name='prodi' placeholder='Prodi . . . ' value={prodi} onChange={(event) => setProdi(event.target.value)} />
                            <label htmlFor="nim">Nim</label>
                            <input className='w-full border-2 border-black rounded-sm m-1' type="text" name='nim' placeholder='Nim . . .' value={nim} onChange={(event) => setNim(event.target.value)} />
                            <label htmlFor="semester">Semester</label>
                            <input className='w-full border-2 border-black rounded-sm m-1' type="number" name='semester' placeholder='Semester . . .' value={semester} onChange={(event) => setSemester(event.target.value)} />

                            <div className='flex justify-end mt-3'>
                                <Button mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button className='border-1 border-black' type='submit' colorScheme='blue'>Submit</Button>
                            </div>

                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>


        </div>
    )
}

export default AddContact