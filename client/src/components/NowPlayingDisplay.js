import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

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
        if(response.status === 204){
          setState('notplaying');
        } else if (response.status === 200){
          setState('loaded');
          console.log(response);
          setNowPlaying(response.data);
        }
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

  async function skipSong() {
    const address = 'https://api.spotify.com/v1/me/player/next';

    setState('loading');
    const config = {
      headers: {
        'Authorization': 'Bearer ' + props.accessToken
      }
    };

    axios.post(address, {}, config)
    .then((response) => {
      console.log(response)
      setState('loaded');
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

  if(state === "notloaded"){
      return(
        <Container className="NowPlaying" fluid>
          <Row>
            <div>Nothing is loaded</div>
            <Button variant="outline-dark" onClick={() => getNowPlaying()}>
              <FontAwesomeIcon icon={faRotateRight} size={'2x'} />
            </Button>
          </Row>
        </Container>
      );
  }
  if(state === "notplaying"){
      return(
          <Container className="NowPlaying" fluid>
            <Row>
              <div>Nothing is played</div>
              <Button variant="outline-dark" onClick={() => getNowPlaying()}>
                <FontAwesomeIcon icon={faRotateRight} size={'2x'} />
              </Button>
            </Row>
          </Container>
      )
  }
  if(state === "loaded"){
      return(
        <Container className="NowPlaying" fluid>
          <Row md="1">
            <Col>
              <Image width="256" height="256" src={nowPlaying.item.album.images.length !== 0 ? nowPlaying.item.album.images[0].url : "../../public/logo192.png"} />
              <p>Now playing {nowPlaying.item.artists[0].name} - {nowPlaying.item.name} {msConversion(nowPlaying.progress_ms)}/{msConversion(nowPlaying.item.duration_ms)}
              </p>
              <Button variant="outline-dark" onClick={() => getNowPlaying()}>
                <FontAwesomeIcon icon={faRotateRight} size={'2x'} />
              </Button>
              <Button variant="outline-dark" onClick={() => skipSong()}>Skip</Button>
            </Col>
          </Row>
          <Row md="8">
              
          </Row>
        </Container>
      );
  }
  if(state === "error"){
    return(
      <div>
        <h1>App failed to load api</h1>
      </div>
    )
  }
}