import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { fetchMovieData, fetchMoviePoster } from "../../apis/apis";
import ContextProvider from "../../utils/ContextProvider";
import "./MoviePane.scss";
import TruncatedText from "../commons/truncatedText/TruncatedText";
import { BASE_URL_API_ENDPOINT, maxLengthForTruncatedText } from "../../utils/constants";


const MoviePane = ({ movieIndex }) => {

    const { allMovies } = useContext(ContextProvider);

    const src = `${BASE_URL_API_ENDPOINT}images/${allMovies[movieIndex]?.["poster-image"]
        }`;

    return <>
        {
            movieIndex < allMovies.length ? <Col xs={4} className="movie-pane p-2 mb-2">
                <img src={src} alt="Not found" />
                <TruncatedText text={allMovies[movieIndex]?.name || ""} customClass="mb-0" />
            </Col> : <></>
        }
    </>


};

export default MoviePane;

