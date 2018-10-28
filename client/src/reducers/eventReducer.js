import { POST_EVENT, GET_EVENT } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  event: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT:
      return {
        event: action.payload,
        loading: false
      };
    case POST_EVENT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        event: action.payload
      };

    default:
      return state;
  }
}
