import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor, updateLikes,updateBookmarks,deletePost} from '../actions/postActions';
import IMAGES from '../images/images';    
function PostCard(props) {
    
    const sanitizedContent = { __html: DOMPurify.sanitize(props.item?props.item.content:null) };
    const {user}=useSelector((state) => state.auth);
    const {likes} = useSelector((state) => state.post);
    const {bookmarks} = useSelector((state) => state.post);
    console.log("bookmarks1",bookmarks)
    const dispatch = useDispatch();
    console.log(props,user)
    const handleLike=()=>{
        const userId = props.author ? props.author._id : null;
        if(userId){
            dispatch(updateLikes(props.item._id,user._id))
        }
    }

    const handleBookmark = () => {
        const userId = props.author ? props.author._id : null;
        if (userId) {
            dispatch(updateBookmarks(props.item._id, user._id))
        }
    };
    console.log("likes state",likes,"bookmarks state",bookmarks)

    const handleDelete=()=>{
        const postId = props.item ? props.item._id : null;
        if (postId) {
            dispatch(deletePost(postId))
        }

    }

  return (
    <div className="postcard">
        <div className="coverimage">
            <img src={props.item?props.item.coverImage:null} alt="coverImage" />
        </div>
        <div className="posttitle">
            <h1>{props.item?props.item.title:null}</h1>
            <div>
                <img src={props.author?props.author.profilePic:null} alt="avatar" />
                <h3>{props.author?props.author.firstName:null}</h3>
            </div>
        </div>
        <div className='postcontent'>
            <div dangerouslySetInnerHTML={sanitizedContent} />
        </div>
        <div className='postbutton'>
        <button onClick={handleLike}>
         {likes && user && likes[user._id]
         ?
         (<img src={IMAGES.heartsuit} alt="like"/>)
         :
         (<img src={IMAGES.heart} alt="like"/>)
         }
         </button>
         <span>{Object.keys(likes)?Object.keys(likes).length:0}</span>
         <button onClick={handleBookmark}>
            {bookmarks && user && bookmarks[props.item?props.item._id:null]
            ?
            (<img src={IMAGES.bookmarked} alt="bookmark"/>)
            :
            (<img src={IMAGES.bookmark} alt="bookmark"/>)
            }
         </button>
         <button onClick={handleDelete}>
            {user &&props.author && (user._id===props.author._id) && (<img src="/images/icons8-delete-32.png" alt="edit"/>)}
         </button>
        </div>
    </div>
  )
}

export default PostCard