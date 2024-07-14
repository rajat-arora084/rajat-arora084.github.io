import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ContextProvider from "../../utils/ContextProvider";
import Loader from "../commons/loader/Loader";
import MoviePane from "../moviePane/MoviePane";
import "./ListingPage.scss";

/**
 * @description: Listing page shows all the movies on the screen. It takes filtered movies as parameter & renders these movies which are filtered based on text search. When text search is empty, it shows complete list of movies.
 * It also shows loader on the UI when there is an api call going on.
 * The listing page renders Movie images in 3 sets per row.
 * 
 * @param {array} filteredMovies: Array of movies fetched from api call
 * & filtered based on text searched by user.
 * 
 * @param {boolean} isLoading: A boolean which identifies whether an api call is underway.
 * 
 * @param {number} pageIndex: The index of the last page till where the movies are fetched.
 * 
 * @param {boolean} hasFetchedAllMovies: The boolean which indicates whether all movies are fetched. Used to show End fo list text to the user.
 * 
 * @returns {jsx}: It returns the list of movies shown in a grid system
 * with each row consisting of 3 movies.
 * 
 */

const ListingPage = () => {

    const { filteredMovies, isLoading, pageIndex, hasFetchedAllMovies } = useContext(ContextProvider);
    const numberOfMovies = filteredMovies.length || 0;
    const numberOfRows = Math.ceil(numberOfMovies / 3); // per Row 3 movies.

    return (<>{
        isLoading && pageIndex === 1 ? <Loader type="large" /> : <>  <Container fluid={true} className="listing-page pt-0">
            {
                Array(numberOfRows).fill("").map((_, rowIndex) => <Row xs={{ gutter: 10 }} key={`row-${rowIndex}`}>
                    {
                        Array(3).fill("").map((_, colIndex) => <MoviePane movieIndex={rowIndex * 3 + colIndex} key={`column-${rowIndex}-${colIndex}`} />
                        )
                    }
                </Row>
                )
            }
            {
                isLoading && pageIndex > 1 && <Row>
                    <Col xs={12}>
                        <Loader type="small" /></Col>
                </Row>
            }
            {
                hasFetchedAllMovies && !isLoading && <Row>
                    <Col xs={12} className="end-of-list d-flex justify-content-center align-items-center"><p>End of List.</p></Col>
                </Row>
            }
        </Container></>
    }

    </>
    );
}

export default ListingPage;