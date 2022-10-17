import React from 'react';
import Table from "../../components/Search/Table/Table.js";
import tableColumns from "../../components/Search/Table/TableColumns.js";
import Search from "../../components/Search/Search.js";
import Sort from "../../components/Search/Sort/Sort.js";
import Practice from "../../components/Search/SEpractice/SEpractice.js";
import "./Search.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL;

function SearchPage() {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "yearOfPublication", order: "desc" });
    const [filterPractice, setFilterPractice] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getAllArticles = async () => {
        try {
            const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&SEpractice=${filterPractice.toString()}&search=${search}`;

            const response = await axios.get(url);
            setObj(response.data);
            console.log(obj);
        } catch (err) {
            console.log(err);
        }};

        getAllArticles();
    }, [sort, filterPractice, page, search]);

    return (
        <div>
            <div className="head">
                <Search setSearch={(search) => setSearch(search)}/>
            </div>
            <div className="body">
                <Table columns={tableColumns} data={obj.articles ? obj.articles : []}/>
            </div>
            <div className="filter_container">
                <Sort sort={sort} setSort={(sort) => setSort(sort)}/>
                <Practice 
                    SEpractices={obj.SEpractices ? obj.SEpractices : []}
                    filterPractice={filterPractice}
                    setFilterPractice={(SEpractice) => setFilterPractice(SEpractice)}
                    />
            </div>
        </div>
      )
}

export default SearchPage;