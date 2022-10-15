import React from 'react';
import Styles from "../components/Search/TableStyle.js";
import Table from "../components/Search/Table.js";
import tableColumns from "../components/Search/TableColumns";
import Search from "../components/Search/Search";
import "./Search.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import mockData from '../backend/testData/AcceptedArticlesTest.json';

const base_url = process.env.REACT_APP_API_URL;

function SearchPage() {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "yearOfPublication", order: "desc" });
    const [filterPractice, setFilterPractice] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    let responseArrayOne = [];
    const responseArrayTwo = "";
    let array = [];

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
        <div className="container">
          <Table columns={tableColumns} data={obj.articles ? obj.articles : []}/>
        </div>
      )
}

export default SearchPage;