import { useState,useEffect } from 'react';
function Card(props) {  
    console.log(props)
    let followersCount = props.user.followers.length;  
    let followingCount = props.user.following.length;
    let memberSince = props.user.createdAt;

    const [bio, setBio] = useState('');
    const isCurrentUser = props.curuser?._id === props.user._id;

    useEffect(() => {
        const savedBio = localStorage.getItem('bio');
        if (savedBio) {
          setBio(savedBio);
        }
      }, []);
    const handleAddBio = (e) => {
        const { value } = e.target;
        console.log(value);
        setBio(value);
      };
    
      const handleSaveBio = () => {
        localStorage.setItem('bio', bio);
      };
  return (
    <div className="card">
        <div className="card-left">
            <img src={props.user.profilePic} alt="" />
        </div>
        <div className="card-right">
            <h2>{props.user.firstName} {props.user.lastName}</h2>
            <div>
                <strong>{followersCount}</strong><span>Followers</span>
                <strong>{followingCount}</strong><span>Following</span>
            </div>
            <p>Member since {memberSince}</p>
            {isCurrentUser && (
          <>
            {bio ? (
              <p>{bio}</p>
            ) : (
              <>
                <input
                className='bio'
                  type="text"
                  placeholder="Add Bio"
                  onChange={handleAddBio}
                  name="bio"
                  value={bio}
                />
                <button className='bio-save' onClick={handleSaveBio}>Save</button>
              </>
            )}
          </>
        )}
        </div>
    </div>
  )
}

export default Card