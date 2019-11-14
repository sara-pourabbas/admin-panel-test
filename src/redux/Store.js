import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './Reducers/index';

const middleware = applyMiddleware(thunkMiddleware);

export default createStore(reducer, middleware);
