import { useSelector } from "react-redux";
function AuthorCard() {
    const {user}=useSelector((state) => state.auth);
  return (
    <div className="AuthorCard">
        <div className="AuthorCard-img">
            <img src={user?user.profilePic:null} alt="pic" />
        </div>
        <div className="AuthorCard-name">
            <h3>{user?user.firstName:null}</h3>
        </div>
    </div>
  )
}

export default AuthorCard