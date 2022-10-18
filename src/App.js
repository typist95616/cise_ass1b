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
import AnalyseListPage from './pages/AnalyseListPage/AnalyseListPage';
import ModerationList from './pages/ModerationListPage/ModerationListPage';
import SubmitPage from './pages/SubmitPage/SubmitPage';
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
          <Route path="/AnalyseList" element = {<AnalyseListPage />}/>
          <Route path="/Submit" element = {<SubmitPage />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;