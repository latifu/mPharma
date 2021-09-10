import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProducts = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const loadingProducts = () => {
  return {
    type: ActionTypes.LOADING
  };
};

export const addProducts = (product) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: product,
  };
};

export const editProducts = (product) => {
  return {
    type: ActionTypes.EDIT_PRODUCT,
    payload: product,
  };
};

export const removeProducts = (product) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    payload: product,
  };
};
