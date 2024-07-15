import React, { useEffect, useRef, useState } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import { maxLengthForTruncatedText } from "../../../utils/constants";
import "./TruncatedText.scss";
import PropTypes from "prop-types";

/**
 * @description: This component displays truncated text when the width
 *               of a paragraph is larger than actual width of its container.
 *               In our case, the width is (100vw/3 -5rem) as every image
 *               container takes around 1/3rd of space excluding padding.
 * 
 * @param {number} maxLength: Maximum length of the text after which the text is shown as ellipsis
 * 
 * @param {string} text: Actual text.
 * 
 * @param {string} customClass: Custom class applied on the paragraph.
 * 
 * @returns {jsx} It renders a truncated text with also a tooltip.
 */


const TruncatedText = ({ maxLength, text, customClass }) => {

    const tooltip = <Tooltip content={text} id={text?.toLowerCase()}>
        <p>{text}</p>
    </Tooltip>

    const [showOverlay, setShowOverlay] = useState(false);
    const ref = useRef();



    useEffect(() => {

        let offsetWidth = ref.current?.offsetWidth;
        let scrollWidth = ref.current?.scrollWidth;
        // When the mouse is over the paragraph & 
        // its width is lesser than the scroll width, then display tooltip.
        ref.current?.addEventListener("mouseover", () => {
            if (offsetWidth < scrollWidth) setShowOverlay(true);
        })

        return () => {
            ref.current?.removeEventListener("mouseover", () => {
                if (offsetWidth < scrollWidth) setShowOverlay(true);
            })
        }

    }, []);

    return <>
        <p className={`truncated-text ${customClass}`} ref={ref}>{text}</p>
        <Overlay show={showOverlay && ref.current.matches(":hover")} placement="bottom" target={ref.current}>
            {tooltip}
        </Overlay>
    </>

}

TruncatedText.propTypes = {
    maxLength: PropTypes.number,
    text: PropTypes.string,
    customClass: PropTypes.string
}

TruncatedText.defaultProps = {
    maxLength: maxLengthForTruncatedText,
    text: "",
    customClass: ""
}

export default TruncatedText;