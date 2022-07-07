import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

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
  SETUP_USER_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  UserId: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:8080/",
  });

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

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const addUserToLocalStorage = ({
    user,
    token,
    UserId,
    firstName,
    lastName,
    email,
    imageUrl,
    isAdmin,
    isAuthenticated,
    savedAt,
  }) => {
    localStorage.setItem("token", JSON.stringify(action.payload.token));
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("UserId", JSON.stringify(action.payload.UserId));
    localStorage.setItem("firstName", JSON.stringify(action.payload.firstName));
    localStorage.setItem("lastName", JSON.stringify(action.payload.lastName));
    localStorage.setItem("email", JSON.stringify(action.payload.email));
    localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
    localStorage.setItem(
      "isAuthenticated",
      JSON.stringify(action.payload.isAuthenticated)
    );
    localStorage.setItem("savedAt", new Date().getTime());
  };

  const removeUserFromLocalStorage = () => {
    localStorage.setItem("token", JSON.stringify(action.payload.token));
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("UserId", JSON.stringify(action.payload.UserId));
    localStorage.setItem("firstName", JSON.stringify(action.payload.firstName));
    localStorage.setItem("lastName", JSON.stringify(action.payload.lastName));
    localStorage.setItem("email", JSON.stringify(action.payload.email));
    localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
    localStorage.setItem(
      "isAuthenticated",
      JSON.stringify(action.payload.isAuthenticated)
    );
    localStorage.setItem("savedAt", new Date().getTime());
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({
      type: SETUP_USER_BEGIN,
    });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const {
        user,
        token,
        UserId,
        firstName,
        lastName,
        email,
        imageUrl,
        isAdmin,
        isAuthenticated,
        savedAt,
      } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          UserId,
          firstName,
          lastName,
          email,
          imageUrl,
          isAdmin,
          isAuthenticated,
          savedAt,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        UserId,
        firstName,
        lastName,
        email,
        imageUrl,
        isAdmin,
        isAuthenticated,
        savedAt: new Date().getTime(),
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({
      type: UPD,
    });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          location,
          token,
        },
      });
      addUserToLocalStorage({
        user,
        location,
        token,
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
      await authFetch.post("/create", {
        content,
        imageUrl,
      });
      dispatch({
        type: CREATE_POST_SUCCRESS,
      });
      dispatch({
        type: CLEAR_VALUES,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const getPosts = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({
      type: GET_POST_BEGIN,
    });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({
      type: SET_EDIT_JOB,
      payload: {
        id,
      },
    });
  };
  const editJob = async () => {
    dispatch({
      type: EDIT_JOB_BEGIN,
    });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({
        type: CLEAR_VALUES,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const deleteJob = async (jobId) => {
    dispatch({
      type: DELETE_JOB_BEGIN,
    });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({
      type: SHOW_STATS_BEGIN,
    });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };
  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: {
        page,
      },
    });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
