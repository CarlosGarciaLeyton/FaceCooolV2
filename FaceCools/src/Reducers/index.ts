import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './exportReducers'

export const rootReducer = combineReducers<any>({
  ...reducers,
  form: formReducer
});
