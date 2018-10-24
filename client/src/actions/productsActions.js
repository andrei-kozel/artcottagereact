import axios from "axios";

import { GET_ERRORS, GET_POSTS, PRODUCT_LOADING, GET_POST } from "./types";

// create new product
export const createProduct = (productData, history) => dispatch => {
  axios
    .post("/api/products/", productData)
    .then(res => history.push("/profile"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//  show all products
export const showAllProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/products/")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// get product by id
export const getProduct = id => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
