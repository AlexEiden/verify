import React from "react";
import moment from "moment";
import Spinner from "components/spinner.jsx"


export default class extends React.Component{

    static get contextTypes(){
        return {
            blank: React.PropTypes.bool
        }
    }

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            serverTime: null // will hold the local Moment obj
        };
    }
    
    componentDidMount(){
        if(!this.context.blank){
            fetch("/api/time")
                .then(r => r.json())
                .then((j) => {
                    this.setState({
                        isLoading:false,
                        serverTime: moment.unix(j.currentTime)
                    })

                    setInterval(() => {
                        this.state.serverTime.add(1, "seconds");
                        this.forceUpdate();
                    }, 1000);
                });
        }
    }

    render(){
        return (
            this.state.isLoading ? 
                <Spinner/>
                : <div>{this.state.serverTime.format("MMMM Do YYYY, h:mm:ss a")}</div>
        )
    }
}