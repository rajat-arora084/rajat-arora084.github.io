import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { searchedText } from "../../utils/constants";
import BackImage from "./../../resources/Back.png";
import SearchImage from "./../../resources/search.png";
import "./SearchBox.scss"

const SearchBox = () => {

    return <>
        <div className="search-box-container">
            <div><img src={BackImage} /></div>
            <input defaultValue={searchedText} type="text"></input>
            <div><img src={SearchImage} /></div>
        </div>
    </>

}

export default memo(SearchBox);