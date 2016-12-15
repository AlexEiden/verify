import React from 'react';
import Helmet from "react-helmet";
import { Link } from 'react-router';

import "pages/pageFrame.scss";

export class PageFrame extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    titleTemplate="%s - Verify"
                    defaultTitle="Verify"
                    link={[
                        {"rel":"stylesheet", "href": "/style.css"}
                    ]}
                    meta={[
                        {"name":"viewport", "content":"width=device-width, initial-scale=1"}
                    ]}
                />
                <div className="container">
                </div>
                <div className="container mainPage">
                    <div className="title">
                        <Link className="title-name" to="/">Verify</Link>
                        <div className="title-nav">
                            {[
                                ["/",         "Home"],
                                ["/about",    "About"]
                            ].map((e, i) => 
                                <Link key={i} className="title-nav-link" to={e[0]}>
                                <b>{e[1]}</b>
                                </Link>
                            )}
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
