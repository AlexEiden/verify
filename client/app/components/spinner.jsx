import React from "react";

import spinnerUrl from "resources/spinner.svg";

let Spinner = (props) => {
    let sizeStr = "" + props.size + "px";
    return <img src={spinnerUrl} style={{"width":sizeStr, "height":sizeStr}}/>
}

Spinner.propTypes = {size: React.PropTypes.number};
Spinner.defaultProps = {size: 20};

export default Spinner;