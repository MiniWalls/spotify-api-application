import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import UserInfoDisplay from './components/UserInfoDisplay';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    //console.log(hashParams);
    return hashParams;
  }

  async function getRefreshToken(){
    var params = getHashParams();
    const address = 'http://localhost:3001/refresh_token';

    const response = await axios({
      method: "get",
      url: address,
      params: {
        refresh_token: params.refresh_token
      }
    })
    setAccessToken(response.data.access_token);
    //onsole.log(response.data.access_token);
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
      document.getElementById('login').style.display = 'none';
      document.getElementById('loggedin').style.display = 'block';
  };

/*   useEffect(() => {
    if(userData){
      const userDataList = document.getElementById("user-data");
       userDataList.innerHTML = '';
      userDataList.append(userData.data.country + '\t');
      userDataList.append(userData.data.display_name + '\t');
      userDataList.append(userData.data.email + '\t');
      userDataList.append(userData.data.id + '\t');
      userDataList.append(userData.data.product + '\t'); 
    }
  }, [userData]) */

  useEffect(() => {
    if(accessToken){
      getUserInfo();
    }else { document.getElementById('loggedin').style.display = 'none'; }
  }, [accessToken])

  useEffect(() => {
    setAccessToken(getHashParams().access_token);
  }, [])


  return (
    <div className="App">
      <h2>Example of the Authorization code flow with Spotify</h2>
      <div id="login">
        <a className="btn btn-primary btn-lg" href="http://localhost:3001/login">Login with Spotify</a>
      </div>
      <div id="loggedin">
        <button className="btn btn-primary" onClick={() => getRefreshToken()}>Get refresh token</button>
        <ul id="user-data">
          <UserInfoDisplay data={userData}/>
        </ul>
      </div>
    </div>
  );
}

export default App;
