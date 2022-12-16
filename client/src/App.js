import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {
  return (
    <div className="App">
      <Container fluid className="app-container">
        <Row>
          <NavBar/>
        </Row>
        <Row>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Home />} />
            <Route path='/profile' element={<Home />} />
          </Routes>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
