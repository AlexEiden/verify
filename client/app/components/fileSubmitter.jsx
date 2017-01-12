import React from "react";
import Dropzone from "react-dropzone";
import CryptoJS from "crypto-js";
import "components/fileSubmitter.scss";

export default class extends React.Component{
    onDrop(acceptedFiles){
        var file = acceptedFiles[0];
        
        this.setState({
            "file":file
        });

        var reader = new FileReader();

        reader.addEventListener(
            'load',
             ()=> {
                console.log("Hash:");
                console.dir(file);
                var wordArray = CryptoJS.lib.WordArray.create(this.result);
                var hash = CryptoJS.SHA256(wordArray);
                var hashHex = hash.toString(CryptoJS.enc.Hex);
                console.log(hashHex);
				this.setState({hash:hashHex});
				this.forceUpdate();
			}
        );
        reader.readAsArrayBuffer(file);
    }

    constructor(props){
        super(props);
        this.state = {
			file: {name:"<none>"},
			hash: "<no hash yet>"
		};
    }

    render(){
        return (
            <div>
                <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
                    <div>Name: {this.state.file.name}</div>
					<div>Hash: {this.state.hash}</div>
                </Dropzone>
            </div>
        )
    }
}
