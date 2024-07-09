import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { fetchMovieData, fetchMoviePoster } from "../../apis/apis";
import ContextProvider from "../../utils/ContextProvider";
import "./MoviePane.scss";
import posterimage from "./../../resources/poster1.jpg"
import TruncatedText from "../commons/truncatedText/TruncatedText";
import { maxLengthForTruncatedText } from "../../utils/constants";


const MoviePane = ({ movieIndex }) => {

    const { allMovies } = useContext(ContextProvider);

    const [posterImg, setPosterImg] = useState(null);

    const fetchPoster = async (movie) => {
        console.log("fetching poster", movie?.["poster-image"]);


        // const result = await fetchMoviePoster({
        //     posterId: movie?.["poster-image"]
        // });
        // console.log("result", result);


        // const base64 = btoa(
        //     new Uint8Array(result.data).reduce(
        //         (data, byte) => data + String.fromCharCode(byte),
        //         ''
        //     )
        // )

        // const abc = Buffer.from(result.data, 'binary').toString('base64')
        setPosterImg();


    }

    useEffect(() => {
        if (movieIndex < allMovies.length) {
            fetchPoster(allMovies[movieIndex])
        }
    }, [movieIndex]);


    return <>
        {
            movieIndex < allMovies.length ? <Col xs={4} className="movie-pane p-2 mb-2">
                <img src={posterimage} alt="Not found" />
                <TruncatedText text={allMovies[movieIndex]?.name || ""} customClass="mb-0" />
            </Col> : <></>
        }
    </>


};

export default MoviePane;

