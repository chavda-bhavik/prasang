import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import categoryReducer from './reducer/categoryReducer';
import AuthReducer from './reducer/AuthReducer';
import EventReducer from './reducer/eventReducer';
import DashboardReducer from './reducer/dashboardReducer';
import {IUsers,ICategorys,IAuth,IEvent,IDashboard} from "./reducer/types";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
    user: IUsers
    category : ICategorys,
    auth:IAuth,
    event:IEvent,
    dashboard:IDashboard
}
const store =createStore(combineReducers({
    user:userReducer,
    category:categoryReducer,
    auth:AuthReducer,
    event:EventReducer,
    dashboard:DashboardReducer
}),
composeEnhancers(applyMiddleware(thunk)))

export default store;