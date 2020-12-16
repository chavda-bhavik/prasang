import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './reducer/reducer';
import categoryReducer from './reducer/categoryReducer';
import AuthReducer from './reducer/AuthReducer';
import {IUsers,ICategorys,IAuth} from "./reducer/types";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
    user: IUsers
    category : ICategorys,
    auth:IAuth
}
const store =createStore(combineReducers({
    user:rootreducer,
    category:categoryReducer,
    auth:AuthReducer
}),
composeEnhancers(applyMiddleware(thunk)))

export default store;