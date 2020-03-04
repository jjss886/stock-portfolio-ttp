import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import history from "../utils/history";

// INITIAL STATE
const initialState = {
  user: {},
  stocks: [],
  portfolio: []
};

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_PORTFOLIO = "SET_PORTFOLIO";
const ADD_STOCK = "ADD_STOCK";

// ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });
export const setPortfolio = portfolio => ({ type: SET_PORTFOLIO, portfolio });
export const addPortfolio = (portfolio, user) => ({
  type: ADD_STOCK,
  portfolio,
  user
});

// THUNKS
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || {}));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const auth = userObj => async dispatch => {
  let res;
  try {
    const { formName } = userObj;
    res = await axios.post(`/auth/${formName}`, userObj);
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/Portfolio");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/SignIn");
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const getPortfolio = userId => async dispatch => {
  try {
    const { data: portfolio } = await axios.get(`/api/${userId}`);
    dispatch(setPortfolio(portfolio));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const addStock = stockObj => async dispatch => {
  try {
    const { data: user } = await axios.post(`/api/`, stockObj);
    dispatch(addPortfolio(stockObj, user));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: {} };
    case SET_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    case ADD_STOCK:
      return {
        ...state,
        portfolio: [...state.portfolio, action.portfolio],
        user: action.user
      };
    default:
      return state;
  }
};

// STORE CREATION
const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
