import createDataContext from "./createDataContext";
import axios from "axios";

const itemReducer = (state, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return { ...state, items: action.payload, loading: false };
    case "POST_ITEM":
      return { ...state, items: [action.payload, ...state.items] };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((ele) => ele._id !== action.payload),
      };
    case "ITEMS_LOADING":
      return { ...state, loading: true };
    default:
      return false;
  }
};

const getItems = (dispatch) => async () => {
  setItemsLoading();
  const response = await axios.get("/api/items");
  dispatch({ type: "GET_ITEMS", payload: response.data });
};

const addItem = (dispatch) => async (item) => {
  const response = await axios.post("/api/items", item);
  dispatch({ type: "POST_ITEM", payload: response.data });
};

const deleteItem = (dispatch) => async (id) => {
  try {
    await axios.delete(`/api/items/${id}`);
    dispatch({ type: "DELETE_ITEM", payload: id });
    alert("Item deleted");
  } catch (err) {
    console.log(err);
  }
};

const setItemsLoading = (dispatch) => () => {
  dispatch({ type: "ITEMS_LOADING" });
};

export const { Provider, Context } = createDataContext(
  itemReducer,
  { getItems, addItem, deleteItem, setItemsLoading },
  { items: [], loading: false }
);