import React, { memo } from "react";
import BackImage from "./../../resources/Back.png";
import SearchImage from "./../../resources/search.png";
import "./SearchBox.scss";

const SearchBox = ({
    onChangeTextSearch,
    textSearch
}) => {

    return <>
        <div className="search-box-container">
            <div><img src={BackImage} alt="Go to previous screen" /></div>
            <input value={textSearch} type="text" onChange={onChangeTextSearch}></input>
            <div><img src={SearchImage} alt="search" /></div>
        </div>
    </>

}

export default memo(SearchBox);