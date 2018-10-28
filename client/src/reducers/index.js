import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productReducer,
  event: eventReducer
});
