import axios from "axios";

export const GET_ALL_MAHASISWA = "GET_ALL_MAHASISWA"
export const ADD_MAHASISWA = "ADD_MAHASISWA"
export const DELETE_MAHASISWA = "DELETE_MAHASISWA"
export const DETAIL_MAHASISWA = "DETAIL_MAHASISWA"
export const UPDATE_MAHASISWA = "UPDATE_MAHASISWA"

export const getAllMahasiswa = () => {
    return (dispatch) => {

        dispatch({
            type: GET_ALL_MAHASISWA,
            payload: {
                loading: true,
                data: false,
                error: false
            }
        })

        axios({
            method: 'GET',
            url: 'http://localhost:3000/biodataMahasiswa',
            timeout: 120000
        })
            .then((response) => {
                dispatch({
                    type: GET_ALL_MAHASISWA,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false
                    }
                })
            })
            .catch((e) => {
                dispatch({
                    type: GET_ALL_MAHASISWA,
                    payload: {
                        loading: false,
                        data: false,
                        error: e.message
                    }
                })
            })

    }
}

export const addMahasiswa = (data) => {
    return (dispatch) => {

        dispatch({
            type: ADD_MAHASISWA,
            payload: {
                loading: true,
                data: false,
                error: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:3000/biodataMahasiswa',
            timeout: 120000,
            data: data
        })
            .then((response) => {
                dispatch({
                    type: ADD_MAHASISWA,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false
                    }
                })
            })
            .catch((e) => {
                dispatch({
                    type: ADD_MAHASISWA,
                    payload: {
                        loading: false,
                        data: false,
                        error: e.message
                    }
                })
            })

    }
}

export const deleteMahasiswa = (id) => {
    return (dispatch) => {

        dispatch({
            type: DELETE_MAHASISWA,
            payload: {
                loading: true,
                data: false,
                error: false
            }
        })

        axios({
            method: 'DELETE',
            url: 'http://localhost:3000/biodataMahasiswa/' + id,
            timeout: 120000,
        })
            .then((response) => {
                dispatch({
                    type: DELETE_MAHASISWA,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false
                    }
                })
            })
            .catch((e) => {
                dispatch({
                    type: DELETE_MAHASISWA,
                    payload: {
                        loading: false,
                        data: false,
                        error: e.message
                    }
                })
            })

    }
}

export const detailMahasiswa = (data) => {
    return (dispatch) => {
        dispatch({
            type: DETAIL_MAHASISWA,
            payload: {
                data: data
            }
        })

    }
}

export const updateMahasiswa = (data) => {
    return (dispatch) => {

        dispatch({
            type: UPDATE_MAHASISWA,
            payload: {
                loading: true,
                data: false,
                error: false
            }
        })

        axios({
            method: 'PUT',
            url: 'http://localhost:3000/biodataMahasiswa/' + data.id,
            timeout: 120000,
            data: data
        })
            .then((response) => {
                dispatch({
                    type: UPDATE_MAHASISWA,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false
                    }
                })
            })
            .catch((e) => {
                dispatch({
                    type: UPDATE_MAHASISWA,
                    payload: {
                        loading: false,
                        data: false,
                        error: e.message
                    }
                })
            })

    }
}