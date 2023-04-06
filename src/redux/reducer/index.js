import handleCart from "./handleCart";
import user from "./user";
import checkcredential from "./checkcredential"
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  handleCart,
  user,
  checkcredential,
});

export default rootReducers;
