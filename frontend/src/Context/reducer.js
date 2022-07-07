import {
    CREATE_POST,
    FETCH_POSTS,
    DELETE_POST,
    CREATE_POST_SUCCRESS,
    GET_POST_BEGIN,
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_PROFILE,
    DELETE_PROFILE,
    LOGOUT_USER,
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_ERROR
} from "./actions";

import {
    initialState
} from "./appContext";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            showAlert: true,
            alertType: 'danger',
            alertText: "Veillez remplir toutes les données"
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
}