import * as React from "react";
import * as ReactDOM from "react-dom";
const createLogger = require('redux-logger').createLogger;
import thunkMiddleware from 'redux-thunk';
const Provider = require('react-redux').Provider;
import {createStore, applyMiddleware} from 'redux';
import {tachesReducer} from './reducers';

import { App } from "./components/App";
import "./css/style.scss";

// ajout de l'index à la variable window
declare var window: {
    [key:string]: any; // missing index defintion
    prototype: Window;
    new(): Window;
}

const enhancer:any = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
    // const store = enhancer(settingsReducer, initialState);


function configureStore(){
    let loggerMiddleware = createLogger();
    let middlewares = [thunkMiddleware,loggerMiddleware];
    let store = createStore(tachesReducer, applyMiddleware(...middlewares));
    // store.dispatch(fetchUserCourant());
    // store.dispatch(fecthHistorique());

    return store;
}

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App compiler="TypeScript" framework="Angular" />
    </Provider>,
    document.getElementById("example")
);