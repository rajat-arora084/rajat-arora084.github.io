import React from "react";
import "./Loader.scss";

const Loader = ({
    type
}) => {
    return <div className={`${type === "small" && "small-loader"} loader-container`}>
        <div className="loader-box"></div>
    </div>
}

export default Loader;