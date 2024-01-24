import Header2 from "./Header2";
import IMAGES from "../images/images";
function Header({user}) {

  return (
    <>
      {user ? <Header2 user={user}/> : 
    <>
      <div className="nav">
        <div className="logo">
          <img src={IMAGES.logo} alt="logo" />
          <h1>INSIDECODE</h1>
        </div>
      </div>
    </>  
}
    </>
   
  )
}

export default Header
