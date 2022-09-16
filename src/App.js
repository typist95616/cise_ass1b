import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import './App.css';
import history from './components/history';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes history = {history}>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;