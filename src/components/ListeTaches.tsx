import * as React from 'react'
import {Tache} from '../actions'

interface IListeTachesProps { taches: Tache[], onTaskChange: any, onAddTask:any }
interface IListeTachesState { title:string }

export class ListeTaches extends React.Component<IListeTachesProps, IListeTachesState>{
    constructor(props:IListeTachesProps){
        super(props);

        this.state = {
            title: ""
        }
    }

    private _doTask(event:any):void{
        console.log(event.target.name)
        if(event.target.checked){
            this.props.onTaskChange(event.target.name)
        }
    }

    private _onTextChange(event:any):void{
        this.setState({
            title: event.target.value
        })
    }

    private _ajouterTache():void{
        if(this.state.title !== ""){
            this.props.onAddTask(this.state.title)
            this.setState({
                title: ""
            })
        }
    }

    public render():JSX.Element{
        return (<div>
            <ul>
                {this.props.taches.map((t:Tache) => {
                    return (
                        <li><input name={t.id} type="checkbox" checked={t.checked} onChange={this._doTask.bind(this)}/>{t.title}</li>
                    )
                })}
            </ul>
            <div>
                <input type="text" value={this.state.title} onChange={this._onTextChange.bind(this)} /><br/>
                <button onClick={this._ajouterTache.bind(this)} >Ajouter</button>
            </div>
        </div>)
    }
}