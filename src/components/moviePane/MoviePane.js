import React, { useContext, useRef } from "react";
import Col from "react-bootstrap/Col";
import { BASE_URL_API_ENDPOINT } from "../../utils/constants";
import ContextProvider from "../../utils/ContextProvider";
import TruncatedText from "../commons/truncatedText/TruncatedText";
import "./MoviePane.scss";
import FallbackImage from "./../../resources/placeholderImage.png";
import PropTypes from "prop-types";

/**
 * 
 * @param {number} movieIndex: The index of the current movie in the moves array. It is used to fetch details of the movie. 
 * @returns  {JSX} : It renders the movie poster along with the movie name.
 *
 */

const MoviePane = ({ movieIndex }) => {

    const { filteredMovies } = useContext(ContextProvider);
    const ref = useRef();

    const onImgError = (_) => {
        ref.current.src = FallbackImage;
    }

    const src = `${BASE_URL_API_ENDPOINT}images/${filteredMovies[movieIndex]?.["poster-image"]
        }`;

    return <>
        {
            movieIndex < filteredMovies.length ? <Col xs={4} className="movie-pane p-2 mb-2">
                <img src={src} onError={onImgError} ref={ref} />
                <TruncatedText text={filteredMovies[movieIndex]?.name || ""} customClass="mb-0" />
            </Col> : <></>
        }
    </>


};


MoviePane.propTypes = {
    movieIndex: PropTypes.number,
}

MoviePane.defaultProps = {
    movieIndex: 0,
}

export default MoviePane;

