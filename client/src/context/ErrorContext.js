import createDataContext from "./createDataContext";
// import axios from "axios";

const errorReducer = (state, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };

    case "CLEAR_ERRORS":
      return { ...state, msg: {}, status: null, id: null };

    default:
      return state;
  }
};

export const returnErrors = (dispatch) => (msg, status, id = null) => {
  console.log("called");
  dispatch({ type: "GET_ERRORS", payload: { msg, status, id } });
};

export const clearErrors = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERRORS" });
};

export const { Provider, Context } = createDataContext(
  errorReducer,
  { returnErrors, clearErrors },
  { msg: {}, status: null, id: null }
);