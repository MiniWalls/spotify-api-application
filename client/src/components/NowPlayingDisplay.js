import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export default function NowPlayingDisplay(props){
    const [nowPlaying, setNowPlaying] = useState(null);
    const [state, setState] = useState("notloaded")

    function msConversion(ms){
        const date = new Date(ms);
        if(date.getSeconds() < 10){
            return date.getMinutes() + ':0' + date.getSeconds()
        }
        return date.getMinutes() + ':' + date.getSeconds()
    }

    async function getNowPlaying(){
        const address = 'https://api.spotify.com/v1/me/player/currently-playing';

        setState('loading');
        const config = {
            headers: {
                'Authorization': 'Bearer ' + props.accessToken
            }
        };
        axios.get(address, config)
        .then((response) => {
            setState('loaded');
            console.log(response);
            setNowPlaying(response.data);
        })
        .catch(error => {
            //401 status means unauthorized
            if(error.response.status === 401) {
                console.log("Refreshing token")
                props.getRefreshToken();
            }
            setState('error');
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(nowPlaying);
    }, [nowPlaying])

    useEffect(() => {
        getNowPlaying();
    }, [])

    if(state === "notloaded"){
        return(
            <Container className="NowPlaying" fluid>
                <Row>
                        <div>Nothing is played</div>
                        <Button onClick={() => getNowPlaying()}>Refresh now playing</Button>
                </Row>
            </Container>
        );
    }
    if(state === "loaded"){
        return(
            <Container className="NowPlaying" fluid>
                <Row>
                        <div>Now playing {nowPlaying.item.artists[0].name} - {nowPlaying.item.name} {msConversion(nowPlaying.progress_ms)}/{msConversion(nowPlaying.item.duration_ms)}</div>
                </Row>
                <Row md="8">
                    <Button onClick={() => getNowPlaying()}>Refresh now playing</Button>
                </Row>
            </Container>
        );
    }
}