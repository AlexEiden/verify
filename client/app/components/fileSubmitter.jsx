import React from "react";
import Dropzone from "react-dropzone";
import CryptoJS from "crypto-js";
import ServerClock from "components/serverClock.jsx";
import "components/fileSubmitter.scss";
import Button from "components/button.jsx";
import dropImg from "resources/drop.svg";
import Spinner from "components/spinner.jsx";

var AttributePair = (props) => (
	<div className="ap">
		<b className="ap-attribute">{props.attr}</b>
		<div className="ap-value">{props.value}</div>
	</div>
)

export default class extends React.Component{
    onDrop(acceptedFiles){
        var file = acceptedFiles[0];
        
		this.setState({ file, isWorking:true });

        var reader = new FileReader();
		
		var self = this; 
        reader.addEventListener(
            'load',
             function(){
                var wordArray = CryptoJS.lib.WordArray.create(this.result);
                var hash = CryptoJS.SHA256(wordArray);
                var hashHex = hash.toString(CryptoJS.enc.Hex);
				self.setState({hash:hashHex, isFlipped: true});
				self.flipTimeout(()=>self.setState({isWorking:false}));
				console.dir(file);
                console.log(`Hash of ${file.name} is ${hashHex}`);
			}
        );
        reader.readAsArrayBuffer(file);
    }

	onCancel(){
		this.setState({isFlipped:false});

		this.flipTimeout(()=>this.setState({file:undefined, hash:undefined}));
	}

	flipTimeout(func){
		// 350ms = .6s/2 + a bit 
		setTimeout(func, 350); // magic number for the right time
	}

    constructor(props){
        super(props);
        this.state = {
			file: undefined,
			hash: undefined,
			isFlipped: false, // seperate because the data is cleared after the flip completes.
			isWorking: false, // is working on a hash
		};
    }

    render(){
		var { isWorking, isFlipped, file, hash } = this.state;
		return (
			<div className={"fs-flip-container" + (isFlipped?" flipped":"")}>
				<div className="fs-file-card">
					<div className="fs-flip-back">
						<a onClick={()=>this.onCancel()} className="fs-cancel">{String.fromCharCode(10006)}</a>
		 				<div className="fs-filename">{file && file.name}</div>
		 				<AttributePair attr="Last changed on" value={file && file.lastModifiedDate.toString()}/>
		 				<AttributePair attr="Signature time" value={<ServerClock/>}/>
		 				<div className="ap"><Button text="Click Me!" onClick={()=>alert("ayy lmao")}/></div>
					</div>
					<div className="fs-flip-front">
						<Dropzone className="fs-dropzone" onDrop={(f)=>this.onDrop(f)} multiple={false}>
							{isWorking? <Spinner size={100}/> :<img src={dropImg} width="100px" height="100px"/>}
						</Dropzone>
					</div>
				</div>
			</div>
		)

    }
}
