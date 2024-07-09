import React from "react";
import { maxLengthForTruncatedText } from "../../../utils/constants";
import "./TruncatedText.scss";

const TruncatedText = ({ maxLength = maxLengthForTruncatedText, text, customClass }) => {

    if (text.length > maxLength) console.log("text", text);

    return <p className={`truncated-text ${customClass}`}>{text}</p>


}

export default TruncatedText;