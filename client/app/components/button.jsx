import React from "react";
import "components/button.scss";

export default (props) => (
	<input
		type="button"
		onClick={props.onClick}
		value={props.text}
		className="button"
	/>
);
