import * as React from "react";
import {ShowTasks} from '../containers'

export interface AppProps { compiler: string; framework: string; }

// 'AppProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class App extends React.Component<AppProps, undefined> {
    render() {
        return (<div>
            <h1>App from {this.props.compiler} and {this.props.framework}!</h1>
            <ShowTasks />
        </div>);
    }
}