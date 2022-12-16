import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

export default function UserInfoDisplay(props){
    console.log(JSON.stringify(props));
    if(props.user){
        return(
            <Container className="UserInfo" fluid>
                <Row>
                    <Col xs lg="1">
                        <Row md="auto" style={{justifyContent:'right'}}> <Image width="90" height="90" roundedCircle={true} src={props.user.data.images[0].url} alt="profile picture"/> </Row>
                    </Col>
                    <Col xs lg="3">
                        <Row>Display name: {props.user.data.display_name}</Row>
                        <Row>Account id: {props.user.data.id}</Row>
                        <Row>Account email: {props.user.data.email}</Row>
                        <Row>County: {props.user.data.country}</Row>
                        <Row>Spotify Product subscription status: {props.user.data.product}</Row>
                    </Col>
                </Row>
            </Container>
        );
    }
    else{
        return(
            <h2>No props passed</h2>
        );
     } 
}