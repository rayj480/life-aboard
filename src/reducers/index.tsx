import { Tache} from '../actions'; 
var uuidV4 = require('uuid').v4;
import {combineReducers} from 'redux';
import * as _ from 'underscore';

var automatiques = (state:any = [], action:any = {}) => {
    switch (action.type) {
        case "add_automatique":
            return [...state, {
                nom: action.nom, 
                credit: action.credit, 
                dateFin: action.dateFin, 
                date: action.date, 
                montant: action.montant, 
                categorie: action.categorie
            }]    
        default:
            return state;
    }
}

var operations = (state:any = [], action:any = {}) => {
    switch (action.type) {
        case "add_operation":
            return [...state, {
                id: uuidV4(),
                nom: action.nom, 
                credit: action.credit, 
                date: action.date, 
                montant: action.montant, 
                categorie: action.categorie, 
                type: action.type, 
                nomte_frais: action.note_frais
            }]
    
        default:
            return state;
    }
}

var comptes = (state:any = [], action:any = {}) => {
    switch (action.type) {
        case "add_compte":
            return [...state, {
                id: uuidV4(), 
                nom: action.nom, 
                solde: action.solde, 
                actions: [], 
                automatique: [],
                compte_epargne: action.compte_epargne
            }]
        case "del_compte": 
            return state.map((c:any) => {
                if(c.id !== action.compte_id){
                    return c
                }
            })
        case "add_operation": 
            return state.map((c:any) => {
                if(c.id === action.compte_id){
                    return operations(c.operations, action)
                }
            })
        case "add_automatique": 
            return state.map((c:any) => {
                if(c.id === action.compte_id){
                    return automatiques(c.automatiques, action)
                }
            })
        default:
            break;
    }
}

var profils = (state:any = [], action:any = {}) => {
    switch (action.type) {
        case "add_profile":
            return [...state, {
                nom: action.nom, 
                id: uuidV4(),
                compte: {}, 
            }]
        case "del_profile": 
            return state.map((p:any) => {
                if(p.id !== action.id){
                    return p
                }
            })
        case "add_compte":
            return state.map((p:any) => {
                if(p.id === action.profil_id){
                    return comptes(p.comptes, action)
                }
            })
        case "del_compte": 
            return state.map((p:any) => {
                if(p.id === action.profil_id){
                    return comptes(p.comptes, action)
                }
            })
        case "add_operation": 
            return state.map((p:any) => {
                if(p.id === action.profil_id){
                    return comptes(p.comptes, action)
                }
            }) 
        case "add_automatique": 
            return state.map((p:any) => {
                if(p.id === action.profil_id){
                    return comptes(p.comptes, action)
                }
            })
        default:
            return state
    }
}

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

export var tachesReducer = combineReducers({profils})