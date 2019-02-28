import {
    ADD_EVENT
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
      default:
        return state;
    }
  }