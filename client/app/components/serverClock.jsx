import React from "react";
import fecha from "fecha";
import Spinner from "components/spinner.jsx"
import DateDisplay from "components/dateDisplay.jsx"

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
            serverTime: null 
        };
    }
    
    componentDidMount(){
        if(!this.context.blank){
            fetch("/api/time")
                .then(r => r.json())
                .then((j) => {
                    this.setState({
                        isLoading:false,
                        serverTime: new Date(j.currentTime * 1000)
                    })

                    this.interval = setInterval(() => {
						this.setState({
							serverTime: new Date(this.state.serverTime.getTime() + 1000)
						})
                    }, 1000);
                });
        }
    }

	componentWillUnmount(){
		clearInterval(this.interval);
	}

    render(){
		var { serverTime, isLoading } = this.state;
        return (
            isLoading ? 
                <Spinner/>
                : <DateDisplay date={this.state.serverTime}/> 
        )
    }
}
