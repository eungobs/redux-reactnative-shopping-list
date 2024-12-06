export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const editItem = (id, newItem) => ({
  type: EDIT_ITEM,
  payload: { id, newItem },
});

export const toggleItem = (id) => ({
  type: TOGGLE_ITEM,
  payload: id,
});
