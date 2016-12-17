import React from "react";

export default class App extends React.Component{
    static get childContextTypes(){
        return {
            blank: React.PropTypes.bool
        }
    }

    getChildContext(){
        return {
            blank: this.props.blank
        }
    }

    render(){
        return (
            <div>{this.props.children}</div>
        )
    }

}