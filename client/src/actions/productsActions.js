import axios from "axios";

import {
  GET_ERRORS,
  GET_POSTS,
  PRODUCT_LOADING,
  GET_POST,
  DELETE_PRODUCT,
  GET_PLATES,
  GET_DEKOR,
  GET_CANDLE,
  GET_OTHER
} from "./types";

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

// edit  product
export const editProduct = (id, productData, history) => dispatch => {
  axios
    .post(`/api/products/${id}`, productData)
    .then(res => history.push(`/products/${id}`))
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

// Delete Product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};

// filters

// plates
export const showPlates = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/products/")
    .then(res =>
      dispatch({
        type: GET_PLATES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PLATES,
        payload: null
      })
    );
};

// candle holder
export const showCandle = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/products/")
    .then(res =>
      dispatch({
        type: GET_CANDLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CANDLE,
        payload: null
      })
    );
};

// dekor
export const showDekor = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/products/")
    .then(res =>
      dispatch({
        type: GET_DEKOR,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DEKOR,
        payload: null
      })
    );
};

// other
export const showOther = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/products/")
    .then(res =>
      dispatch({
        type: GET_OTHER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_OTHER,
        payload: null
      })
    );
};
