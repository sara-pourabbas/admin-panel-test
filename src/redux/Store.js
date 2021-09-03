import { createStore, applyMiddleware } from 'redux';
import {compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducer from './Reducers/index';


let composeEnhancers = compose;

if (process.env.NODE_ENV==='development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const middleware = applyMiddleware(thunkMiddleware);

export default createStore(reducer,composeEnhancers( middleware));
