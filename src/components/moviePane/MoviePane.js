import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import { BASE_URL_API_ENDPOINT } from "../../utils/constants";
import ContextProvider from "../../utils/ContextProvider";
import TruncatedText from "../commons/truncatedText/TruncatedText";
import "./MoviePane.scss";


const MoviePane = ({ movieIndex }) => {

    const { filteredMovies } = useContext(ContextProvider);

    const src = `${BASE_URL_API_ENDPOINT}images/${filteredMovies[movieIndex]?.["poster-image"]
        }`;

    return <>
        {
            movieIndex < filteredMovies.length ? <Col xs={4} className="movie-pane p-2 mb-2">
                <img src={src} alt="Not found" />
                <TruncatedText text={filteredMovies[movieIndex]?.name || ""} customClass="mb-0" />
            </Col> : <></>
        }
    </>


};

export default MoviePane;

