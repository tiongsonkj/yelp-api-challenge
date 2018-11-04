import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

const initialState = {};

const middleware = [thunk]; //WHAT DOES THIS MEAN WHAT DOES THIS DO!?

const store = createStore(
    rootReducers,
    initialState,
    compose(
        applyMiddleware(...middleware),

        //need this line to implement the chrome Redux extension
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    )
)

export default store;