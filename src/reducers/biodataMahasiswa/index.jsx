import { GET_ALL_MAHASISWA, ADD_MAHASISWA, DELETE_MAHASISWA, DETAIL_MAHASISWA, UPDATE_MAHASISWA } from '../../actions/actionBiodata'

const initialState = {
    getAllMahasiswaResult: false,
    getAllMahasiswaLoading: false,
    getAllMahasiswaError: false,

    addMahasiswaResult: false,
    addMahasiswaLoading: false,
    addMahasiswaError: false,

    deleteMahasiswaResult: false,
    deleteMahasiswaLoading: false,
    deleteMahasiswaError: false,

    detailMahasiswaResult: false,

    updateMahasiswaResult: false,
    updateMahasiswaLoading: false,
    updateMahasiswaError: false,
}

const biodata = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MAHASISWA:
            return {
                ...state,
                getAllMahasiswaLoading: action.payload.loading,
                getAllMahasiswaResult: action.payload.data,
                getAllMahasiswaError: action.payload.error
            }
        case ADD_MAHASISWA:
            return {
                ...state,
                addMahasiswaLoading: action.payload.loading,
                addMahasiswaResult: action.payload.data,
                addMahasiswaError: action.payload.error
            }

        case DELETE_MAHASISWA:
            return {
                ...state,
                deleteMahasiswaLoading: action.payload.loading,
                deleteMahasiswaResult: action.payload.data,
                deleteMahasiswaError: action.payload.error
            }
        case DETAIL_MAHASISWA:
            return {
                ...state,
                detailMahasiswaResult: action.payload.data
            }

        case UPDATE_MAHASISWA:
            return { 
                ...state,
                updateMahasiswaLoading: action.payload.loading,
                updateMahasiswaResult: action.payload.data,
                updateMahasiswaError: action.payload.error
            }
        default:
            return state
    }
}

export default biodata