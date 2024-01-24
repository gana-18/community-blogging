import { useState } from "react"
import { useSelector } from "react-redux"
import AuthorCard from "../components/AuthorCard"
function Following() {
    const {user}=useSelector(state=>state.auth)
    const [followingClicked,setFollowingClicked]=useState(false)
    function clicked(){
        setFollowingClicked(prev=>!prev)
    }
  return (
    <div className="Following">
        <div className="follow-card">
            <button onClick={clicked}>Following</button>
            <button onClick={clicked}>Followers</button>
        </div>
        <div className="users">
            <AuthorCard/>
        </div>
    </div>
  )
}

export default Following