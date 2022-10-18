import './App.css'
import SearchPage from "./pages/SearchPage/Search"
import { Container } from 'react-bootstrap'
import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
