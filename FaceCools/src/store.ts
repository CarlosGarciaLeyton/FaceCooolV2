import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './Reducers';
import thunk from 'redux-thunk';
import services from './Services';
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(
    rootReducer, composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(services))
    )
);
