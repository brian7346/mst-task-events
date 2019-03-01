import {
    ADD_EVENT,
    DELETE_EVENT
  } from "../actions/types";

  const initialState = {
    events: []
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_EVENT:
        return {
          ...state,
          events: [...state.events, action.event],
        };
      case DELETE_EVENT:
        return {
          ...state,
          events: state.events.filter(i => action.id !== i._id),
        };
      default:
        return state;
    }
  }