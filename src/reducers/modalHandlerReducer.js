import { 
    HANDLE_ADD_EVENT_MODAL,
    HANDLE_EDIT_EVENT_MODAL
} from "../actions/types";

const initialState = {
    addEventModalOpen: false,
    editEventModalOpen: false,
    modalData: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case HANDLE_ADD_EVENT_MODAL:
        return {
          ...state,
          addEventModalOpen: action.value,
        };
      case HANDLE_EDIT_EVENT_MODAL:
        return {
          ...state,
        editEventModalOpen: action.value,
        modalData: action.modalData
        };
      default:
        return state;
    }
  }
  