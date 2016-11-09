import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='width=device-width, minimum-scale=1.0' />
                <title>{this.props.title}</title>
            </head>
            <body>
                <div id='root' dangerouslySetInnerHTML={{__html: this.props.body}} />
                <script src='/app.js'/>
            </body>
            </html>
        )
    }
}