import axios from "axios";

export const GET_LIST_CONTACT = "GET_LIST_CONTACT"
export const ADD_CONTACT = "ADD_CONTACT"

export const getListContact = () => {
    return (dispatch) => {

        dispatch({
            type: GET_LIST_CONTACT,
            payload: {
                loading: true,
                data: false,
                error: false
            }
        })

        axios({
            method: 'GET',
            url: 'http://localhost:3000/contacts',
            timeout: 120000
        })
            .then((response) => {
                dispatch({
                    type: GET_LIST_CONTACT,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false
                    }
                })
            })
            .catch((e) => {
                dispatch({
                    type: GET_LIST_CONTACT,
                    payload: {
                        loading: false,
                        data: false,
                        error: e.message
                    }
                })
            })

    }
}

export const addContact = (data) => {
    return (dispatch) => {

        dispatch({
            type: ADD_CONTACT,
            payload: {
                loading: true,
                data: false,
                error: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:3000/contacts',
            timeout: 120000,
            data: data
        })
            .then((response) => {
                dispatch({
                    type: ADD_CONTACT,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false
                    }
                })
            })
            .catch((e) => {
                dispatch({
                    type: ADD_CONTACT,
                    payload: {
                        loading: false,
                        data: false,
                        error: e.message
                    }
                })
            })

    }
}