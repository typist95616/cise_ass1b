import './App.css'
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
import ModerationListComponent from './pages/ModerationListPage/ModerationListPage';
import RejectedArticlesComponent from './pages/ShowRejectedArticlesPage/ShowRejectedArticlesPage';
import WaitingArticlesComponent from './pages/WaitingArticlesPage/WaitingArticlesPage';
import SearchPage from "./pages/SearchPage/Search"
import ActiveArticlesListComponent from './pages/ArticlesPage/ArticlesPage';
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

const ModerationListPage = withRouter(ModerationListComponent);
const RejectedArticlesPage = withRouter(RejectedArticlesComponent);
const WaitingAriclesPage = withRouter(WaitingArticlesComponent);
const ActiveArticlesPage = withRouter(ActiveArticlesListComponent);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/moderationArticlesPage" element = {<ModerationListPage />} />
          <Route path="/rejectedArticlesPage" element = {<RejectedArticlesPage/>} />
          <Route path="/waitingArticlesPage" element = {<WaitingAriclesPage/>}/>
          <Route path="/activeArticlesPage" element={<ActiveArticlesListComponent/>}/>
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;