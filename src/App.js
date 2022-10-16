import './App.css'
import SearchPage from "./pages/SearchPage/Search"
import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
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
