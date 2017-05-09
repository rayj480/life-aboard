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
        case "del_automatique":
            if(state.id !== action.automatique_id){
                return state
            }    
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
        case "del_operation": 
            if(state.id !== action.operation_id){
                return state
            }
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
        case "del_operation":
            return state.map((c:any) => {
                return operations(c.operations, action)
            })
        case "add_automatique": 
            return state.map((c:any) => {
                if(c.id === action.compte_id){
                    return automatiques(c.automatiques, action)
                }
            })
        case "del_automatique":
            return state.map((c:any) => {
                return automatiques(c.automatiques, action)
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


export var tachesReducer = combineReducers({profils})