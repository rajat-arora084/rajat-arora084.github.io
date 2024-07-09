import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ContextProvider from "../../utils/ContextProvider";
import Loader from "../commons/loader/Loader";
import MoviePane from "../moviePane/MoviePane";
import "./ListingPage.scss";

const ListingPage = () => {

    const { filteredMovies, isLoading, pageIndex, hasFetchedAllMovies } = useContext(ContextProvider);
    const numberOfMovies = filteredMovies.length || 0;
    const numberOfRows = Math.ceil(numberOfMovies / 3); // per Row 3 movies.

    return (<>{
        isLoading && pageIndex === 1 ? <Loader /> : <>  <Container fluid={true} className="listing-page pt-0">
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