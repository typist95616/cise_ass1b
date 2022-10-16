import React from 'react';
import './Search.css';

const Search = ({ setSearch }) => {
    return (
        <input type="text"
                className="searchBar"
                placeholder="Search"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
                />
    )
}

export default Search;