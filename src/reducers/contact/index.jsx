import { GET_LIST_CONTACT, ADD_CONTACT, DELETE_CONTACT } from '../../actions/actionContact'

const initialState = {
    getListContactResult: false,
    getListContactLoading: false,
    getListContactError: false,

    addContactResult: false,
    addContactLoading: false,
    addContactError: false,

    deleteContactResult: false,
    deleteContactLoading: false,
    deleteContactError: false,
}

const contact = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_CONTACT:
            return {
                ...state,
                getListContactLoading: action.payload.loading,
                getListContactResult: action.payload.data,
                getListContactError: action.payload.error
            }
        case ADD_CONTACT:
            return {
                ...state,
                addContactLoading: action.payload.loading,
                addContactResult: action.payload.data,
                addContactError: action.payload.error
            }

        case DELETE_CONTACT:
            return {
                ...state,
                deleteContactLoading: action.payload.loading,
                deleteContactResult: action.payload.data,
                deleteContactError: action.payload.error
            }
        default:
            return state
    }
}

export default contact