import React, { memo } from "react";
import BackImage from "./../../resources/Back.png";
import SearchImage from "./../../resources/search.png";
import "./SearchBox.scss";
import PropTypes from "prop-types";

/**
 * 
 * @param {function} onChangeTextSearch: Callback function to update the text search 
 * 
 * @param {string} textSearch: Text search applied.
 * 
 * @param {function} onBackBtnClick: Callback to clear text search.
 * 
 * @returns {jsx} Returns an html element which shows a search box & back button to the user. It can be used to search the movies based on their names.
 */
const SearchBox = ({
    onChangeTextSearch,
    textSearch,
    onBackBtnClick
}) => {
    // Renders the search box with search & back button functioanlity.
    return <>
        <div className="search-box-container">
            <div><img src={BackImage} alt="Go to previous screen" onClick={onBackBtnClick} /></div>
            <input value={textSearch} type="text" onChange={onChangeTextSearch}></input>
            <div><img src={SearchImage} alt="search" /></div>
        </div>
    </>

}

SearchBox.propTypes = {
    onChangeTextSearch: PropTypes.func,
    textSearch: PropTypes.string,
    onBackBtnClick: PropTypes.func,
}

SearchBox.defaultProps = {
    onChangeTextSearch: Function.prototype,
    textSearch: "",
    onBackBtnClick: Function.prototype
}

export default memo(SearchBox);