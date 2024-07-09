import React, { useContext, useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import ContextProvider from "../../utils/ContextProvider";
import Loader from "../commons/loader/Loader";
import MoviePane from "../moviePane/MoviePane";
import SearchBox from "../search/SearchBox";
import "./ListingPage.scss"

const ListingPage = ({
    handleScroll,

}) => {

    const { allMovies, isLoading, pageIndex } = useContext(ContextProvider);
    const numberOfMovies = allMovies.length || 0;
    const numberOfRows = Math.ceil(numberOfMovies / 3); // per Row 3 movies.

    const ref = useRef();

    // useEffect(() => {
    //     console.log("listing page", ref.current);
    //     ref.current.addEventListener("scroll", () => {
    //         // handleScroll(ref.current);
    //         console.log("reff", ref.current.getBoundingClientRect(),
    //             ref.current.scrollTop)

    //     });

    //     return () => {
    //         ref.current.removeEventListener("scroll", () => handleScroll(ref));
    //     }
    // }, []);


    return (<>{
        isLoading ? <Loader /> : <>  <Container fluid={true} className="listing-page">
            {
                Array(numberOfRows).fill("").map((_, rowIndex) => <Row xs={{ gutter: 10 }}>
                    {
                        Array(3).fill("").map((_, colIndex) => <MoviePane movieIndex={rowIndex * 3 + colIndex} />
                        )
                    }
                </Row>
                )
            }
        </Container></>
    }

    </>
    );
}

export default ListingPage;