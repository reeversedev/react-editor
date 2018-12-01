import axios from "axios";
import { GET_DOCUMENT, POST_DOCUMENT, SAVE_DOCUMENT } from "./type";

export function getDocument(id, successCallback, errorCallback) {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3000/document/${id}`);
      await dispatch({ type: GET_DOCUMENT, payload: response });
      successCallback && successCallback();
    } catch (e) {
      errorCallback && errorCallback(e);
    }
  };
}
export function postDocument(data, successCallback, errorCallback) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`http://localhost:3000/document`, data);
      await dispatch({ type: POST_DOCUMENT, payload: response });
      successCallback && successCallback();
    } catch (e) {
      errorCallback && errorCallback(e);
    }
  };
}
export function saveDocument(data, successCallback, errorCallback) {
  return async function(dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3000/document/${data.id}`,
        data
      );
      await dispatch({ type: SAVE_DOCUMENT, payload: response });
      successCallback && successCallback();
    } catch (e) {
      errorCallback && errorCallback(e);
    }
  };
}
