import { ActionTypes } from "../constants/action-types";

const initialState = {
  loading: false
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, ...payload, loading: false };
    case ActionTypes.LOADING:
      return { ...state, loading: true }

    default:
      return state;
  }
};
