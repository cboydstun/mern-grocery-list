import createDataContext from "./createDataContext";
import axios from "axios";
import { returnErrors } from "./ErrorContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return { ...state, loading: true };
    case "USER_LOADED":
      console.log(state);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      console.log(state);
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

const loadUser = (dispatch) => async () => {
  // User Loading
  dispatch({ type: "USER_LOADING" });

  //Get token from local storage
  const token = localStorage.getItem("token");

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios.get("/api/auth/user", config);
    console.log(response.data);
    dispatch({ type: "USER_LOADED", payload: response.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: "AUTH_ERROR" });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { loadUser },
  {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: null,
    user: null,
  }
);