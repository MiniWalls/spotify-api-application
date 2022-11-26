import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState([]);

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
    setAccessToken(response.data.access_token);
    console.log(response.data.access_token);
  }

  async function getUserInfo(){
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
  };

  useEffect(() => {
    setAccessToken(getHashParams().access_token)
    console.log("We are in react hook and token is " + accessToken);
    if(accessToken){
      getUserInfo();
    }
  }, [])


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
