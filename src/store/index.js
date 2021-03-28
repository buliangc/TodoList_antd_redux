import reducer from "./reducer";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware,compose} from 'redux'

const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );

  const store = createStore(reducer, enhancer);


export default store;