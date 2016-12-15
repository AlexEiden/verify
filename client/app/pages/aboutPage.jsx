import React from "react";
import Helmet from "react-helmet";

export class AboutPage extends React.Component{
    render(){
        return (
            <div>
                <Helmet title="About"/>
                <h2>This is the About page.</h2>
                <div>other things go here</div>
            </div>
        );
    }
}