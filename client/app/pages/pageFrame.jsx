import React from 'react';
import Helmet from "react-helmet";
import { Link } from 'react-router';

import "pages/main.scss";

export class PageFrame extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    title="Verify"
                    titleTemplate="%s - Verify"
                    link={[
                        {"rel":"stylesheet", "href": "/style.css"}
                    ]}
                />
                <div className="container">
                    <Link to="/"><b>Home</b></Link>
                    <Link to="/about">About</Link>
                </div>
                <div className="container mainPage">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
