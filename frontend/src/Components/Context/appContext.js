import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  DELETE_POST,
  RETRIEVE_POST,
  RETRIEVE_POSTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  RETRIEVE_COMMENTS,
  GET_ALL_USER,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  DELETE_USER,
  GET_CURRENT_USER,
  GET_ALL_USER,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  content: "",
  imageUrl: "",
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:8080/",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const updateUser = async (currentUser) => {
    dispatch({
      type: UPDATE_USER,
    });
    try {
      const { data } = await authFetch.patch(`home/${id}`, currentUser);

      const { firstName, lastName, email, imageUrl, password } = data;

      dispatch({
        type: UPDATE_USER,
        payload: {
          firstName,
          lastName,
          email,
          imageUrl,
          password,
        },
      });
      addUserToLocalStorage({
        firstName,
        lastName,
        email,
        imageUrl,
        password,
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: {
            msg: error.response.data.msg,
          },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        name,
        value,
      },
    });
  };
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };
  const createPost = async () => {
    dispatch({
      type: CREATE_POST,
    });
    try {
      const { content, imageUrl } = state;
      await authFetch.post("api/create", {
        content,
        imageUrl,
      });
      dispatch({
        type: CREATE_POST_SUCCESS,
      });
      dispatch({
        type: CLEAR_VALUES,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_POST_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const getPosts = async () => {
    const { page, search } = state;

    let url = `api/posts`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({
      type: GET_POSTS,
    });
    try {
      const { data } = await authFetch(url);
      const { posts, totalPosts } = data;
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts,
          totalPosts,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const updatePost = (postId, data) => async (dispatch) => {
    try {
      const res = await ContentService.updatePosts(postId, data);

      dispatch({
        type: UPDATE_POST,
        payload: data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deletePost = async (postId) => {
    dispatch({
      type: DELETE_POST,
    });
    try {
      await authFetch.delete(`api/${postId}`);
      getPosts();
    } catch (error) {
      logoutUser();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        updateUser,
        handleChange,
        clearValues,
        createPost,
        getPosts,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
