import http from '../services/instance'
import { setLoading } from './loading';

export const Types = {

  POKEALL: 'ecommerce/POKEALL',
  POKEALL_FAIL: 'ecommerce/POKEALL_FAIL',
  
  DETAILPOKE: 'ecommerce/DETAILPOKE',
  DETAILPOKE_FAIL: 'ecommerce/DETAILPOKE_FAIL',

  POKECART: 'ecommerce/POKECART',
  POKECART_FAIL: 'ecommerce/POKECART_FAIL',

  CLEAR_POKEMON: 'ecommerce/CLEAR_POKEMON'
};

// Reducer

const initialState = {
  pokeall: [],
  pokedetail: [],
  pokecart: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Types.POKEALL:
      return {
        ...state,
        pokeall: action.payload,
      };
    case Types.POKEALL_FAIL:
      return {
        ...state,
      };
    case Types.DETAILPOKE:
      return {
        ...state,
        pokedetail: action.payload
      };
    case Types.DETAILPOKE_FAIL:
      return {
          ...state,
      };
    case Types.POKECART:
      return {
        ...state,
        pokecart: action.payload
      };
    case Types.POKECART_FAIL:
      return {
          ...state,
      };
    case Types.CLEAR_POKEMON:
      return {
        ...state,
        pokecart: []
      };
    default:
      return state;
  }
}

// Action Creators
export async function listPokemons(callbackSuccess, callbackFail) {
    return function (dispatch) {
      http.get('/pokemon')
        .then((response) => {
          console.log(response)
            dispatch({
              type: Types.POKEALL,
              payload: response.data
            });
            callbackSuccess();
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch({
            type: Types.POKEALL_FAIL,
            payload: { error: error }
          });
          dispatch(setLoading(false));
          // callbackFail(error.response.data);
        });
    }
}

export async function detailPokemon(values, callbackSuccess, callbackFail) {
  return function (dispatch) {
    dispatch(setLoading(true))
      http.get(`/pokemon/${values}`)
      .then((response) => {
          dispatch({
            type: Types.DETAILPOKE,
            payload: response.data
          });
          callbackSuccess();
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch({
          type: Types.DETAILPOKE_FAIL,
          payload: { error: err }
        });
        dispatch(setLoading(false));
        // callbackFail();
      });
  }
}

export async function pokeCart(values, callbackSuccess, callbackFail) {
  return function (dispatch) {
    let listPoke = values;
    dispatch(setLoading(true))
     dispatch({
        type: Types.POKECART,
        payload: listPoke
      });
      callbackSuccess();
    dispatch(setLoading(false));
  }
}

export function clearPokemon(){
  return function(dispatch){
    dispatch({type: Types.CLEAR_POKEMON});
  }
}


