import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

// INITIAL STATE
const initialState = {};

// ACTION TYPE

// ACTION CREATORS

// THUNKY THUNKS

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
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
