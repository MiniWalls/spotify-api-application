export default function UserInfoDisplay(props){
    console.log(JSON.stringify(props));
    if(props.data.data){
        return(
            <div className="UserInfo">
                Hello world!
                <p>{props.data.data.country}</p>
{/*                 <p>{props.data.name}</p>
                <p>{props.data.email}</p>
                <p>{props.data.id}</p>
                <p>{props.data.product}</p> */}
            </div>
        );
    }
    else{
        return(
            <h2>No props passed</h2>
        );
     } 
}