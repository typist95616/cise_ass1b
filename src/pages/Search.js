import React from 'react';
import './Search.css';

const search = ({ placeHolder, data }) => {

    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text"/>
                <div className="searchIcon"></div>
            </div>
            <div className="dataResult"></div>
        </div>
    )
}

export default search;