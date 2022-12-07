import UserInfoDisplay from "../components/UserInfoDisplay";
import LogInDisplay from "../components/LogInDisplay";
import axios from 'axios';
import {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import CryptoJS from "crypto-js";

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
    }

    async function getUserInfo(){
        if(sessionStorage.getItem("userData") == null){ 
            const address = 'https://api.spotify.com/v1/me';

            const response = await axios({
            method: "get",
            url: address,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
            })
            console.log("Api data");
            setUserData(response);
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(response), 'secret key 123').toString();
            sessionStorage.setItem("userData", encryptedData);
        } else {
            console.log("session storage data");
            const encryptedData = sessionStorage.getItem("userData");
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
            const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
            setUserData(decryptedData);
        }
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