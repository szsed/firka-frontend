import rootReducer from './reducers/root-reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(thunk);


const store = createStore(rootReducer, middleware);

export default store;
