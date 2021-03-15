// store/loading.js

// Action Types

export const Types = {
  CHANGE_LOADING_STATE: 'loading/CHANGE_LOADING_STATE',
};
  
// Reducer

const initialState = {
  isLoading: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case Types.CHANGE_LOADING_STATE:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    default:
      return state;
  }
}

// Action Creators

export function setLoading(isLoading) {
  return {
    type: Types.CHANGE_LOADING_STATE,
    payload: {
      isLoading
    }
  };
}