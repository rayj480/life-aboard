import { Tache} from '../actions'; 
var uuidV4 = require('uuid').v4;
import {combineReducers} from 'redux';
import * as _ from 'underscore';


var initialState = [
    {
        id: uuidV4(), 
        title: 'first task', 
        checked: false
    },
    {
        id: uuidV4(), 
        title: 'second task', 
        checked: false
    }
]


var tache = (state:Tache = {}, action:any) => {
    switch (action.type) {
        case 'DEL_TACHE':
            if(state.id !== action.id){
                return state
            }
        default:
            return {}
    }
}

var taches = (state:Tache[] = initialState, action:any) => {
    switch (action.type) {
        case 'ADD_TACHE':
            return [...state, {
                id: uuidV4(), 
                title: action.title, 
                checked: false
            }]
        case 'DEL_TACHE':
            return _.reject(state, (t:Tache) => t.id === action.id)
        default:
            return initialState
    }
}

export var tachesReducer = combineReducers({taches})