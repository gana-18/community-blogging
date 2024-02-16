import Article from "../components/Article";
import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {fetchPosts,fetchFollowingPosts} from '../actions/postActions';
import IMAGES from '../images/images';
import SideCard from "../components/SideCard";
function Home() {
  const {user} = useSelector((state) => state.auth);
  const {posts} = useSelector((state) => state.post);
  const {followingPosts} = useSelector((state) => state.post);
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredPosts = posts?.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredPosts);
  },[searchTerm])
  console.log(searchResults);

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchFollowingPosts(user._id))
  },[ dispatch])

  const cards = posts?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));

  const followcards = followingPosts?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));

  const filteredPosts = searchResults?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));
const url=user? `/home/following/${user._id}` : `/`;
  
  return (
    <>
      <div className="home">
        <div className="home-left">
          <div className="home-top">
          <div className="homelinks">
          <div>
          <NavLink to="/home" style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center', color: location.pathname === "/home" ? '#3B82F6' : 'black' }}
              activestyle={{ color: 'black' }}>
               <img src={IMAGES.magic} alt="magic" /> Personalized
        </NavLink>
          </div>
        <div>
        <NavLink to={url} style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center',color: location.pathname === "/home/following" ? '#3B82F6' : 'black' }}
              activestyle={{ color: '#3B82F6' }}
            >
             <img src={IMAGES.following} alt="following"/> Following
        </NavLink>
        </div>
        
       </div>
       <div className="search">
              <input type="search" placeholder="Start typing to search..." onChange={handleSearch} value={searchTerm}/>
              <img src={user.profilePic} alt="user"/>
        </div>
          </div>
        
        {location.pathname ===(url) && !searchTerm ?null: (searchTerm ? <h4>Showing results {searchResults.length} out of {posts.length}</h4>:null)}
          {location.pathname ===(url) && !searchTerm ? followcards : (searchTerm ? filteredPosts : cards)}
        </div>
        <div className="home-right">
          <SideCard >
            <h3>Welcome {user.firstName}🚀</h3>
          </SideCard>
          <SideCard >
            <h3>Read by topics⬇️</h3>
            {posts?.map((item)=>{
              return <Link to={`/topics/${item.topic}`} key={item._id} style={{margin:'0.5px'}}>
                <p>{item.topic}</p>
              </Link>
            })}
          </SideCard>
        </div>
      </div>
    </>
  )
}

export default Home;
