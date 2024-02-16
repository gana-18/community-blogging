import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAuthor,addFollowing,removeFollowing} from '../actions/postActions';
import IMAGES from '../images/images';
export default function Article(props){

      const [author, setAuthor] = useState([]);
      const [isFollowing, setIsFollowing] = useState(false);

      const {user}=useSelector((state) => state.auth);
      const post = useSelector((state) => state.post);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      const sanitizedContent = { __html: DOMPurify.sanitize(props.item.content) };

      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(fetchAuthor(props.item.user)).then((response) => {
          setAuthor(response);
        });
      }, [props.item.user, dispatch]);

      useEffect(() => {
        // Check if the user is already following the author
        const isUserFollowing = user?.following.some((followedId) => followedId === props.item.user);
        setIsFollowing(isUserFollowing);
      }, [user, props.item.user]);


      const handleFollow = async() => {
        if (isFollowing) {
          // If the current user is already following the author, unfollow
          await dispatch(removeFollowing(props.item.user, user._id))
          setIsFollowing(false);
        } else {
          // If the current user is not following the author, follow
          await dispatch(addFollowing(props.item.user, user._id))
          setIsFollowing(true);
        }
      };
      const postPage = () => {
        window.location.href = `/post/${props.item._id}`;
      };
      const profilePage = () => {
        window.location.href = `/profile/${author._id}`;
      };
    return(
        <>
            <div className="article">
                <div className="blog-left">
                    <div className="author">
                        <div className='userpic'>
                           <img onClick={profilePage} src= {author?author.profilePic:null} alt="" />
                        </div>
                        <div onClick={profilePage} className='username'>
                          <h3>{author?author.firstName:"blogger"}</h3>
                          <p>Updated on {formatDate(props.item.createdAt)}</p>
                        </div>
                        <button className={isFollowing ? 'following' : 'follow'} onClick={handleFollow}>
                                {isFollowing ? <img src={IMAGES.following} alt="following"/> : <img src={IMAGES.follow} alt="plus" />}
                        </button>
                    </div>
                    <div onClick={postPage} className="content">
                        <h2>{props.item.title}</h2>
                        <div dangerouslySetInnerHTML={sanitizedContent} />
                    </div>

                    <div className='article-likes'>
                      <div className='likes'>
                      <img src={IMAGES.love} alt="heart" />
                      <span>{Object.keys(props.item.likes)?Object.keys(props.item.likes).length:0}</span>
                      </div>
                      <div className='views'>
                      <img src={IMAGES.eye} alt="views" />
                      <span>{Math.floor(Math.random()*100)}</span>
                      </div>
                    </div>
                </div>
                <div className="blog-right">
                    <img src={props.item.coverImage[0]} alt="" />
                </div>
            </div>
        </>
    )
}