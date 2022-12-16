export default function LogInDisplay(){
    return(
        <div id="login">
            <a className="btn btn-primary btn-lg" href={process.env.REACT_APP_SERVER_ADDRESS+ "/login"}>Login with Spotify</a>
        </div>
    );
}