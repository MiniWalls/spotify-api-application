export default function UserInfoDisplay(props){
    console.log(JSON.stringify(props));
    if(props.user){
        return(
            <div className="UserInfo">
                Hello world!
                <p>{props.user.data.country}</p>
                <p>{props.user.data.name}</p>
                <p>{props.user.data.email}</p>
                <p>{props.user.data.id}</p>
                <p>{props.user.data.product}</p>
            </div>
        );
    }
    else{
        return(
            <h2>No props passed</h2>
        );
     } 
}