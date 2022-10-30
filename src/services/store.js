import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import payloadReducer from './reducers';

const rootReducers = combineReducers({payloadReducer});

export const Store = createStore(rootReducers, applyMiddleware(thunk));
