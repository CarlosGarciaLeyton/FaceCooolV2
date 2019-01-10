
import { AnyAction } from 'redux'

import { IPosts } from '../Models/State'
import { FetchActionsTypes, PostActionTypes } from '../Utils/ActionTypes'

const initialState: IPosts = {
  data: {},
  fetched: false,
  fetching: false,
  added: false,
  error: ''
}

export default function reducer(state: IPosts = initialState, action: AnyAction) {
  switch (action.type) {
    case FetchActionsTypes.START:
      return {
        ...state,
        fetching: true,
        added: false,
        error: ''
      }
    case FetchActionsTypes.SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetched: true,
        fetching: false
      }
    case FetchActionsTypes.ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      }
    case PostActionTypes.ADD_POST:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        },
        added: true,
        fetched: false
      };
    default:
      return state;
  }
}
