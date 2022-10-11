import './App.css'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Search from "./pages/Search"
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/search" element={<Search/>}/>
            </Routes>
          </Router>
        </div>
    </Container>
  )
}

export default App;
