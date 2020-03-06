import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import history from "../utils/history";
import { stockPull, stockPullTest } from "../utils/utilities";

// -------------- INITIAL STATE --------------
const initialState = {
  user: {},
  stocks: {},
  portfolio: [],
  error: false,
  errorMsg: "",
  style: "closing"
};

// -------------- ACTION TYPES --------------
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_PORTFOLIO = "SET_PORTFOLIO";
const STOCK_TRANSACT = "STOCK_TRANSACT";
const SET_STOCK = "SET_STOCK";
const SET_ERROR = "SET_ERROR";
const SET_STYLE = "SET_STYLE";

// -------------- ACTION CREATORS --------------
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });
export const setPortfolio = portfolio => ({ type: SET_PORTFOLIO, portfolio });
export const setStock = stocks => ({ type: SET_STOCK, stocks });
export const addPortfolio = (portfolio, user) => ({
  type: STOCK_TRANSACT,
  portfolio,
  user
});
export const setError = (errorMsg = "") => ({ type: SET_ERROR, errorMsg });
export const setStyle = style => ({ type: SET_STYLE, style });

// -------------- THUNKS --------------
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
    history.push("/");
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

export const transactStock = stockObj => async dispatch => {
  try {
    const { data: user } = await axios.post(`/api/`, stockObj);
    dispatch(addPortfolio(stockObj, user));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const getLiveStock = portfolio => async dispatch => {
  try {
    const stockFullObj = {};

    Object.keys(portfolio).forEach(stock => {
      // const stockObj = stockPull(stock); // ACTUAL DATA FROM API HITS!
      const stockObj = stockPullTest(stock); // DUMMY DATA FROM TEST FUNC!
      stockFullObj[stock] = stockObj;
    });

    dispatch(setStock(stockFullObj));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

// -------------- REDUCER --------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: {} };
    case SET_PORTFOLIO:
      return { ...state, portfolio: action.portfolio };
    case STOCK_TRANSACT:
      return {
        ...state,
        portfolio: [...state.portfolio, action.portfolio],
        user: action.user
      };
    case SET_STOCK:
      return {
        ...state,
        stocks: action.stocks
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.errorMsg === "" ? false : true,
        errorMsg: action.errorMsg
      };
    case SET_STYLE:
      return {
        ...state,
        style: action.style
      };
    default:
      return state;
  }
};

// -------------- STORE CREATION --------------
const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
