import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor, updateLikes,updateBookmarks,deletePost} from '../actions/postActions';
import IMAGES from '../images/images';    
function PostCard(props) {
    
    const sanitizedContent = { __html: DOMPurify.sanitize(props.item?props.item.content:null) };
    const {user}=useSelector((state) => state.auth);
    const{likes}=useSelector((state)=>state.post)
    const {bookmarks}=useSelector((state)=>state.post)
    const dispatch = useDispatch();

    const handleLike=async()=>{
        const userId = props.author ? props.author._id : null;
        console.log(userId)
        if(userId){
            const res=await dispatch(updateLikes(props.item._id,user._id))
        }
    }

    const handleBookmark = async() => {
        const userId = props.author ? props.author._id : null;
        if (userId) {
            const res=dispatch(updateBookmarks(props.item._id, user._id))
        }
    };

    const handleDelete=async()=>{
        const postId = props.item ? props.item._id : null;
        if (postId) {
            window.confirm('Are you sure you want to delete this article?')
            const res=await dispatch(deletePost(postId))
            if(res.status===200){
                window.location.href='/'
            }
            else{
                alert('Failed to delete article')
                window.location.href='/'
            }
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
            {user &&props.author && (user._id===props.author._id) && (<img src={IMAGES.delete} alt="delete"/>)}
         </button>
        </div>
    </div>
  )
}

export default PostCard