import UserInfoDisplay from "../components/UserInfoDisplay";
import LogInDisplay from "../components/LogInDisplay";
import axios from 'axios';
import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'

export default function Home(){
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
        const address = process.env.REACT_APP_SERVER_ADDRESS + '/refresh_token';

        const response = await axios({
            method: "get",
            url: address,
            params: {
            refresh_token: params.refresh_token
            }
        })
        setAccessToken(response.data.access_token);
        //console.log(response.data.access_token);
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

    useEffect(() => {
    if(accessToken){
        getUserInfo();
    }else { document.getElementById('loggedin').style.display = 'none'; }
    }, [accessToken])

    useEffect(() => {
    setAccessToken(getHashParams().access_token);
    }, [])

    return(
        <>
            <h1>This is demo Spotify API application</h1>
            <div id="login">
                <LogInDisplay />
            </div>
            <div id="loggedin">
                <Button onClick={() => getRefreshToken()}>Get refresh token</Button>
                <UserInfoDisplay user={userData}/>
            </div>
        </>
    );
}