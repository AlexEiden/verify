import React from "react";
import fecha from "fecha";

export default (props) => (
	<div>{fecha.format(props.date, "MMMM Do YYYY, h:mm:ss a")}</div>
)
