import React from "react";
import "components/button.scss";

export default (props) => (
	<button onClick={props.onClick} className="button">
		{props.text}
	</button>
);
