import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import './components/NavBar/NavBar.css';

import ModerationList from './pages/ModerationListPage/ModerationListPage';
import NavBar from './components/NavBar/NavBar';

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

const ModerationListPage = withRouter(ModerationList);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/ModerationList" element = {<ModerationListPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;