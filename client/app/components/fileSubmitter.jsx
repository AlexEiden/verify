import React from "react";
import Dropzone from "react-dropzone";

export default class extends React.Component{
    onDrop(acceptedFiles){
        console.log("Accepted:");
        console.dir(acceptedFiles);
        this.setState({
            file:acceptedFiles[0]
        })
    }

    render(){
        return (
            <div>
                <Dropzone onDrop={this.onDrop} multiple={false}>
                    <div>This is a Dropzone!</div>
                </Dropzone>
            </div>
        )
    }
}