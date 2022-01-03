import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger]; //store expect middlewares in form of array.

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;