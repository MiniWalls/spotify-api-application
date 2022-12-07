import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function UserInfoDisplay(props){
    /* console.log(JSON.stringify(props)); */
    if(props.user){
        return(
            <Container className="UserInfo">
                <Row>
                    <Col>
                        <Image src={props.user.data.images.url} alt="profile picture"/>
                        <Row>Display name: {props.user.data.display_name}</Row>
                        <Row>Account id: {props.user.data.id}</Row>
                        <Row>Account email: {props.user.data.email}</Row>
                    </Col>
                    <Col>
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