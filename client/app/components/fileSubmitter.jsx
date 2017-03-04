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

var	emptyState = {
	hash: undefined,
	isFlipped: false, // seperate because the data is cleared after the flip completes.
	isWorking: false, // is working on a hash
	isSubmitting: false, // Is submitting hash to server
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

		this.flipTimeout(()=>this.setState(emptyState));
	}

	onSubmit(){
		this.setState({isSubmitting:true});
		fetch("/api/sign", {
			method:"POST",
			body: JSON.stringify({documentHash:this.state.hash}),
			headers:{
				"Accept":"application/json",
				"Content-type":"application/json",
			}

		})
		.then(res => res.json())
		.then((sig) => {
			this.setState({isSubmitting:false, hasResult: true});
			console.dir(sig);
			var sigBlob = new Blob([JSON.stringify(sig)], {type:"application/json"});
			console.log(sigBlob);
			var objURL =  window.URL.createObjectURL(sigBlob);
			
			// Download obj
			var dlLink = document.createElement('a');
			dlLink.href=objURL;
			dlLink.download=`${this.state.file.name}.verify`;
			dlLink.click();
			
			// Reset component
			this.onCancel();
		}).catch((err) => {
			alert(err);	
		});
	}

	flipTimeout(func){
		// 350ms = .6s/2 + a bit 
		setTimeout(func, 350); // magic number for the right time
	}

    constructor(props){
        super(props);
		this.state = emptyState;
    }

    render(){
		var { isWorking, isSubmitting, isFlipped, file, hash, objURL } = this.state;
		return (
			<div className={"fs-flip-container" + (isFlipped?" flipped":"")}>
				<div className="fs-file-card">
					<div className="fs-flip-back">
						<a onClick={()=>this.onCancel()} className="fs-cancel">{String.fromCharCode(10006)}</a>
		 				<div className="fs-filename">{file && file.name}</div>
		 				<AttributePair attr="Last changed on" value={file && <DateDisplay date={file.lastModifiedDate}/>}/>
		 				<AttributePair attr="Signature time" value={<ServerClock/>}/>
		 				<div className="ap"><Button text={isSubmitting? <Spinner/> :"Click Me!"} onClick={()=>this.onSubmit()}/></div>
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
