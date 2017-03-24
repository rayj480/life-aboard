

export type Tache = {id?:string, title?:string, checked?:boolean}

export var ajouterTaches = (title:string) => {
    return {
        type: 'ADD_TACHE',
        title: title
    }
}

export var effacerTache = (id:string) => {
    return {
        type: 'DEL_TACHE', 
        id: id
    }
}