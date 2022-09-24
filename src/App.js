import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import './components/Styles.css';

import Test from './components/Test';
import ModerationList from './components/ModerationListPage';
import AnalyseListPage from './components/AnalyseListPage';

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
const ModerationListPage = withRouter(ModerationList);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<TestPage />} /> 
          <Route path="/ModerationList" element = {<ModerationListPage />} />
          <Route path="/AnalyseList" element = {<AnalyseListPage />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;