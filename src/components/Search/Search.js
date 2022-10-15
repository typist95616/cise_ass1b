import React from 'react';
import './Search.css';

const Search = ({ setSearch }) => {
    return (
        <div className="search">
            <input type="text"
                placeHolder="Search"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
                />
            <div className="searchIcon"></div>
        </div>
    )
}

export default Search;