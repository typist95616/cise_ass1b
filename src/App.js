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

import Test from './components/Test';

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

const TestPage = withRouter(Test);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/' element = {TestPage} />
      </BrowserRouter>
    );
  }
}

export default App;