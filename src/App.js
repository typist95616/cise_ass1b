import './App.css'
import SearchPage from "./pages/Search"
import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL;

function App() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "yearOfPublication", order: "desc" });
  const [filterPractice, setFilterPractice] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&SEpractice=${filterPractice.toString()}&search=${search}`;

        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllArticles();
  }, [sort, filterPractice, page, search]);

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
            <Routes>
              <Route path="/search" element={<SearchPage/>}/>
            </Routes>
          </Router>
        </div>
    </Container>
  )
}

export default App;
