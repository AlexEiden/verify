import React from 'react';


export class PageFrame extends React.Component {
    render() {
        return (
            <div>
                <h2>This is part of the frame</h2>
                {this.props.children}
            </div>
        );
    }
}
