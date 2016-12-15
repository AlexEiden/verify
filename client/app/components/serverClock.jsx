import React from "react";

import spinnerUrl from "resources/spinner.svg";

export default class extends React.Component{
    static get timeFormatString(){
        return "MMMM Do YYYY, h:mm:ss a"
    } 

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            localTime: null // will hold the local Moment obj
        }
    }
    
    componentDidMount(){
        //TODO: Put stuff here later
    }

    render(){
        return (
            this.state.isLoading ? 
                <img src={spinnerUrl} style={{"width":"30px", "height":"30px"}}/>
                : <div>{this.state.localTime.format(this.timeFormatString)}</div>
        )
    }
}