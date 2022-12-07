import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes} from 'react-router-dom';
import UserInfoDisplay from './components/UserInfoDisplay';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {

/*   async function getUserInfo(){
    const address = 'https://api.spotify.com/v1/me';

      const response = await axios({
        method: "get",
        url: address,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      console.log(response);
      setUserData(response);
      document.getElementById('login').style.display = 'none';
      document.getElementById('loggedin').style.display = 'block';
  };

  useEffect(() => {
    if(accessToken){
      getUserInfo();
    }else { document.getElementById('loggedin').style.display = 'none'; }
  }, [accessToken])

  useEffect(() => {
    setAccessToken(getHashParams().access_token);
  }, []) */


  return (
    <div className="App">
{/*       <h2>Example of the Authorization code flow with Spotify</h2>
      <div id="login">
        <a className="btn btn-primary btn-lg" href="http://localhost:3001/login">Login with Spotify</a>
      </div>
      <div id="loggedin">
        <button className="btn btn-primary" onClick={() => getRefreshToken()}>Get refresh token</button>
        <ul id="user-data">
          <UserInfoDisplay user={userData}/>
        </ul>
      </div> */}
      <Container fluid className="app-container">
        <Row>
          <NavBar/>
        </Row>
        <Row>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/aboutus' element={<Home />} />
            <Route path='/profile' element={<Home />} />
          </Routes>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
