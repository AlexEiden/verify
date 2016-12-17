import React from 'react';
import { Link } from 'react-router';
import ServerClock from "components/serverClock.jsx";
import "pages/mainPage.scss";

export class MainPage extends React.Component{
    render(){
        return (
            <div>
                <p>Drop a file here to sign it at</p>
                <ServerClock/>
            </div>
        );
    }
}
