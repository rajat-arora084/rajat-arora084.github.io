import React from "react";
import "./Loader.scss";
import PropTypes from "prop-types";

const Loader = ({
    type
}) => {
    return <div className={`${type === "small" && "small-loader"} loader-container`}>
        <div className="loader-box"></div>
    </div>
}

Loader.propTypes = {
    type: PropTypes.oneOf(["small", "large"])
}

Loader.defaultProps = {
    type: "large"
}

export default Loader;