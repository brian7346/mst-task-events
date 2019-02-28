import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import modalHandlerReducer from "./modalHandlerReducer";
import eventsReducer from "./eventsReducer";


export default combineReducers({
  item: itemReducer,
  modalHandler: modalHandlerReducer,
  event: eventsReducer
});
