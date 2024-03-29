import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep, faMusic, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { HomeContext } from '../pages/Home';
/*This code needs major refractoring
We are unable to make the track being played update in real time while having multiple features in one component. 
We only need to rerender everything which uses the track once track changes. Only re render the clock until track changes. 
We will make the current time be a state which gets updated by getting date now before and after and adding it to the time we got from API*/
export default function NowPlayingDisplay(){
  const [nowPlaying, setNowPlaying] = useState(null);
  const [state, setState] = useState("notloaded")

  const { getRefreshToken, accessToken } = useContext(HomeContext);

  function msConversion(ms){
    const date = new Date(ms);
    if(date.getSeconds() < 10){
      return date.getMinutes() + ':0' + date.getSeconds()
    }
    return date.getMinutes() + ':' + date.getSeconds()
  }

  async function getTrackAudioFeatures(){
    const address = `https://api.spotify.com/v1/audio-features/${nowPlaying.item.id}`;

    setState('loading');
    const config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    };
    axios.get(address, config)
    .then((response) => {
      setState('loaded');
      setNowPlaying({...nowPlaying, audioFeatures: response.data});
    })
    .catch(error => {
      //401 status means unauthorized
      if(error.response.status === 401) {
          console.log("Refreshing token")
          getRefreshToken();
      }
      setState('error');
      console.log(error);
    })
  }

  async function getNowPlaying(){
    const address = 'https://api.spotify.com/v1/me/player/currently-playing';

    setState('loading');
    const config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
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
            getRefreshToken();
        }
        setState('error');
        console.log(error);
      })
  }

  useEffect(() => {
    if(accessToken && state === 'notloaded'){
      getNowPlaying();
    }
  })

  async function skipSong() {
    const address = 'https://api.spotify.com/v1/me/player/next';

    setState('loading');
    const config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    };

    axios.post(address, {}, config)
    .then((response) => {
      console.log(response)
      setState('loaded');
      setTimeout(()=>{getNowPlaying()}, 5000);
    })
    .catch(error => {
      //401 status means unauthorized
      if(error.response.status === 401) {
          console.log("Refreshing token")
          getRefreshToken();
      }
      setState('error');
      console.log(error);
    })
  }

  async function skipToPreviousSong () {
    const address = 'https://api.spotify.com/v1/me/player/previous';

    setState('loading');
    const config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    };

    axios.post(address, {}, config)
    .then((response) => {
      console.log(response)
      setState('loaded');
      setTimeout(()=>{getNowPlaying()}, 2000);
    })
    .catch(error => {
      //401 status means unauthorized
      if(error.response.status === 401) {
          console.log("Refreshing token")
          getRefreshToken();
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
              <Button variant="outline-dark" onClick={() => skipToPreviousSong()}>
                <FontAwesomeIcon icon={faBackwardStep} size={'2x'} />
              </Button>
              <Button variant="outline-dark" onClick={() => getNowPlaying()}>
                <FontAwesomeIcon icon={faRotateRight} size={'2x'} />
              </Button>
              <Button variant="outline-dark" onClick={() => skipSong()}>
                <FontAwesomeIcon icon={faForwardStep} size={'2x'} />
              </Button>
            </Col>
          </Row>
          <Row md="8">
            <Col>
              <Button variant="outline-dark" onClick={() => getTrackAudioFeatures()}>
                {`Details `} <FontAwesomeIcon icon={faMusic} size={'1x'} />
              </Button>
            </Col>
          </Row>
          <Row > 
            <Col> 
              {nowPlaying.audioFeatures &&
                <div>
                  {Object.entries(nowPlaying.audioFeatures).map(([key, value]) => {
                  return <div>{key}: {value}</div>
                  })}
                </div>
                }
            </Col>
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