import React from "react";
import Dropzone from "react-dropzone";
import ServerClock from "components/serverClock.jsx";
import "components/fileSubmitter.scss";
import DateDisplay from "components/dateDisplay.jsx"
import Button from "components/button.jsx";
import dropImg from "resources/drop.svg";
import Spinner from "components/spinner.jsx";

var AttributePair = (props) => (
	<div className="ap">
		<b className="ap-attribute">{props.attr}</b>
		<div className="ap-value">{props.value}</div>
	</div>
)


function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}


export default class extends React.Component{
    onDrop(acceptedFiles){
        var file = acceptedFiles[0];
        
		this.setState({ file, isWorking:true });

        var reader = new FileReader();

		// Start timer
		var start = new Date().getTime()
		
		var self = this; 
        reader.addEventListener(
            'load',
             function(){
				// from https://github.com/diafygi/webcrypto-examples#sha-256---digest
				window.crypto.subtle.digest(
					{
						name: "SHA-256",
					},
					this.result 
				)
				.then(function(hash){
					//returns the hash as an ArrayBuffer
					var hashHex = buf2hex(hash);
					self.setState({hash:hashHex, isFlipped: true});
					self.flipTimeout(()=>self.setState({isWorking:false}));
					
					var end = new Date().getTime()	
					console.log(`Hash of ${file.name} is ${hashHex}\nComputed in ${(end-start)/1000}s.`);
				})
				.catch(function(err){
					console.error(err);
				});
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
		 				<AttributePair attr="Last changed on" value={file && <DateDisplay date={file.lastModifiedDate}/>}/>
		 				<AttributePair attr="Signature time" value={<ServerClock/>}/>
		 				<div className="ap"><Button text="Click Me!" onClick={()=>alert("ayy lmao")}/></div>
					</div>
					<div className="fs-flip-front">
						<Dropzone className="fs-dropzone" onDrop={(f)=>this.onDrop(f)} multiple={false}>
							{isWorking? <Spinner size={100}/> :<img src={dropImg} width={100} height={100}/>}
						</Dropzone>
					</div>
				</div>
			</div>
		)

    }
}
