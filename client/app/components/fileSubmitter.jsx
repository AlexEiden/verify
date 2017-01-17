import React from "react";
import Dropzone from "react-dropzone";
import CryptoJS from "crypto-js";
import ServerClock from "components/serverClock.jsx";
import "components/fileSubmitter.scss";
import dropImg from "resources/drop.svg";

var AttributePair = (props) => (
	<div className="ap">
		<b className="ap-attribute">{props.attr}</b>
		<div className="ap-value">{props.value}</div>
	</div>
)

export default class extends React.Component{
    onDrop(acceptedFiles){
        var file = acceptedFiles[0];
        
		this.setState({
            "file":file
        });

        var reader = new FileReader();
		
		var self = this; 
        reader.addEventListener(
            'load',
             function(){
                var wordArray = CryptoJS.lib.WordArray.create(this.result);
                var hash = CryptoJS.SHA256(wordArray);
                var hashHex = hash.toString(CryptoJS.enc.Hex);
				self.setState({hash:hashHex});
				console.dir(file);
                console.log(`Hash of ${file.name} is ${hashHex}`);
			}
        );
        reader.readAsArrayBuffer(file);
    }


    constructor(props){
        super(props);
        this.state = {
			file: undefined,
			hash: undefined,
		};
    }

    render(){
        return (
            <div>
                <Dropzone className="dropzone" onDrop={(f) => this.onDrop(f)} multiple={false}>
				{ this.state.file ? (<div>
						<div className="dropzone-filename">{this.state.file.name}</div>
						<AttributePair attr="Last changed on" value={this.state.file.lastModifiedDate.toString()}/>
						<AttributePair attr="Signature time" value={<ServerClock/>}/>
					</div>)
				:
					<img src={dropImg} width="100px" height="100px"/>	
				}
				</Dropzone>
            </div>
        )
    }
}
