import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './reducer/reducer';
import categoryReducer from './reducer/categoryReducer';
import {IUsers,ICategorys} from "./reducer/types";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
    user: IUsers
    category : ICategorys
}
const store =createStore(combineReducers({
    user:rootreducer,
    category:categoryReducer
}),
composeEnhancers(applyMiddleware(thunk)))

export default store;