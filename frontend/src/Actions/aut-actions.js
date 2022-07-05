import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_USER,
    DELETE_USER,
    SET_MESSAGE,
    GET_CURRENT_USER,
    GET_USER,
    GET_ALL_USER
} from './types';


import authService from '../Services/auth-services';
import userService from '../Services/user.service';

// Register User
export const register = (firstName, lastName, email, password, controlPassword) => (dispatch) => {
    authService.register(firstName, lastName, email, password, controlPassword).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    )
}

// LOGIN
export const login = (email, password) => (dispatch) =>
    authService.login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: data
                }
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        }
    );

// LOGOUT
export const logout = () => (dispatch) => {
    authService.logout();
    dispatch({
        type: LOGOUT
    });
};

// DELETE User
export const deleteUser = (userId) => (dispatch) => {
    userService.deleteUser(userId);
    dispatch({
        type: DELETE_USER
    });
};

export const currentProfile = () => async (dispatch) => {
    try {
        const res = await userService.getMyProfile();
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getProfile = (UserId) => async (dispatch) => {
    try {
        const res = await userService.getProfile(UserId);
        dispatch({
            type: GET_USER,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

// GET ALL USERS
export const getAllProfile = () => async (dispatch) => {
    try {
        const res = await userService.getAllProfile();
        dispatch({
            type: GET_ALL_USER,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

// Update Profile
export const editProfile = (UserId, data) => async (dispatch) => {
    try {
        const res = await userService.updateProfile(UserId, data);
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
};