import {
  ADD_PRODUCT,
  GET_POSTS,
  PRODUCT_LOADING,
  GET_POST
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  products: [],
  product: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        product: action.payload
      };
    default:
      return state;
  }
}
