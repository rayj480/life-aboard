var connect = require('react-redux').connect
import {ListeTaches} from '../components/ListeTaches'
import {effacerTache, ajouterTaches} from '../actions'

export var ShowTasks = connect((state:any) => {
    return {
        taches:state.taches
    }
}, (dispatch:any) => {
    return {
        onTaskChange: (id:string) =>{
            dispatch(effacerTache(id))
        }, 
        onAddTask: (title:string) => {
            dispatch(ajouterTaches(title))
        }
    }
})(ListeTaches)