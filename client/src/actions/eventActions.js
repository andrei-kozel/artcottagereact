import axios from "axios";

import { GET_ERRORS, GET_EVENT } from "./types";

// create new product
export const createEvent = (eventData, history) => dispatch => {
  axios
    .post("/api/event/", eventData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// edit  event
export const editEvent = (id, eventData, history) => dispatch => {
  axios
    .post(`/api/event/${id}`, eventData)
    .then(res => history.push(`/`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//  show all events
export const getEvent = () => dispatch => {
  axios
    .get("/api/event/")
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data[0]
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT,
        payload: null
      })
    );
};
