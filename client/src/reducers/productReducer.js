import {
  ADD_PRODUCT,
  GET_POSTS,
  PRODUCT_LOADING,
  GET_POST,
  DELETE_PRODUCT,
  GET_PLATES,
  GET_DEKOR,
  GET_CANDLE,
  GET_OTHER
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
    case DELETE_PRODUCT:
      return {
        ...state,
        posts: state.products.filter(post => post._id !== action.payload)
      };
    case GET_PLATES:
      return {
        ...state,
        products: action.payload.filter(post => post.category === "Tallrik"),
        loading: false
      };
    case GET_DEKOR:
      return {
        ...state,
        products: action.payload.filter(post => post.category === "Dekoration"),
        loading: false
      };
    case GET_CANDLE:
      return {
        ...state,
        products: action.payload.filter(post => post.category === "Ljusstake"),
        loading: false
      };
    case GET_OTHER:
      return {
        ...state,
        products: action.payload.filter(post => post.category === "Övrig"),
        loading: false
      };
    default:
      return state;
  }
}
