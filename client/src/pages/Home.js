import UserInfoDisplay from "../components/UserInfoDisplay";
import LogInDisplay from "../components/LogInDisplay";
import axios from 'axios';
import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'

export default function Home(){
    const [accessToken, setAccessToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [state, setState] = useState('loggedout');

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

    }

    async function getUserInfo(){
        const address = 'https://api.spotify.com/v1/me';

        setState('loading');
        const config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };
        axios.get(address, config)
        .then((response) => {
            setState('loggedin');
            console.log(response);
            setUserData(response);
        })
        .catch(error => {
            if(error.response.status === 401) {
                console.log("Refreshing token")
                getRefreshToken();
            }
            setState('error');
            console.log(error);
        })
    };

    useEffect(() => {
    if(accessToken){
        console.log("access token is " + accessToken);
        getUserInfo();
        localStorage.setItem("token", JSON.stringify(getHashParams()));
        console.log("token is " + localStorage.getItem("token"));
    }
    }, [accessToken])

    useEffect(() => {
    setAccessToken(getHashParams().access_token);
    }, [])

    if(state === 'loggedout'){
        return(
            <div>
                <h1>This is demo Spotify API application current state of application is: {state}</h1>
                <LogInDisplay /> 
            </div>
        )
    }
    if(state === 'loading'){
        return <div>Loading...</div>
    }
    if(state === 'error'){
        return <div>Error loading user</div>
    }
    if(state === 'loggedin'){
        return(
            <div>
                <h1>This is demo Spotify API application current state of application is: {state}</h1>
                <Button onClick={() => getRefreshToken()}>Get refresh token</Button>
                <UserInfoDisplay user={userData}/>
            </div>
        )
    }
}