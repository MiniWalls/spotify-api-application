import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import {useEffect} from 'react';
import axios from 'axios';

function App() {

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  

  async function getRefreshToken(){
    var params = getHashParams();
    console.log("PARAMS ARE " + JSON.stringify(params.refresh_token));
    const address = 'http://localhost:3001/refresh_token';


    const response = await axios({
      method: "get",
      url: address,
      params: {
        refresh_token: params.refresh_token
      }

    })
    console.log(response.data.access_token);

/*     axios.get(address, {
      refresh_token: params.refresh_token
    })
    .then((response) => {
      console.log("THIS IS THE RESPONSE");
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    }) */
  }

  return (
    <div className="App">
      <div>
        <h2>Example of the Authorization code flow with Spotify</h2>
        <a className="btn btn-primary btn-lg" href="http://localhost:3001/login">Login with Spotify</a>
        <button className="btn btn-primary" onClick={() => getRefreshToken()}>Get refresh token</button>
      </div>
      <div id="signedInDiv"></div>
    </div>
  );
}

export default App;
