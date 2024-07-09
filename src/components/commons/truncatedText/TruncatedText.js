import React from "react";
import { maxLengthForTruncatedText } from "../../../utils/constants";
import "./TruncatedText.scss";

const TruncatedText = ({ maxLength = maxLengthForTruncatedText, text, customClass }) => {


    return <p className={`truncated-text ${customClass}`}>{text}</p>


}

export default TruncatedText;