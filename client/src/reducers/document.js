import { GET_DOCUMENT, POST_DOCUMENT, SAVE_DOCUMENT } from "../actions/type";

const INTITAL_STATE = {
  document: {}
};

export default function(state = INTITAL_STATE, action) {
  switch (action.type) {
    case GET_DOCUMENT:
      return {
        ...state,
        getDocument: action.payload.data
      };
    case POST_DOCUMENT:
      return {
        ...state,
        postDocument: action.payload.data
      };
    case SAVE_DOCUMENT:
      return {
        ...state,
        saveDocument: action.payload.data
      };
    default:
      return {
        ...state
      };
  }
}
