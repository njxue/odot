import { combineReducers } from "redux";
import userReducer from "./authReducer";
import testReducer from "./testReducer";

// Combine all reducers
const reducers = combineReducers({
  users: userReducer,
  test: testReducer
});

export default reducers;
