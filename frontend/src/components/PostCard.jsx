import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor, updateLikes,updateBookmarks,deletePost} from '../actions/postActions';
import IMAGES from '../images/images'; 
import {toast} from 'react-toastify'; 
import {FaEdit,FaHashtag,FaCircle} from 'react-icons/fa'  
import { Link } from 'react-router-dom';
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
            const res=await dispatch(updateBookmarks(props.item._id, user._id))
            if(Object.keys(res.data).length>0 && res.status===200){
                toast.success('Bookmarked')
            }
            else if(Object.keys(res.data).length===0 && res.status===200){
                toast.error('Bookmark removed')
            }
            else{
                toast.error('Failed to bookmark')
            }
        }
    };

    const handleDelete=async()=>{
        const postId = props.item ? props.item._id : null;
        const confirmed = window.confirm(
            'Are you sure you want to delete this article?'
          );
        if (!confirmed) return;
        if (postId) {
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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
                <FaCircle size={8}/><h3>{formatDate(props.item?.createdAt)}</h3>
                <FaCircle size={8}/> <FaHashtag/><Link to={`/topics/${props.item?.topic}`}><h3>{props.item?.topic}</h3></Link>
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
         <button onClick={()=>{
                window.location.href=`/edit/${props.item._id}`
         }}>
            {user &&props.author && (user._id===props.author._id) && (<FaEdit size={28}/>)}
         </button>
        </div>
    </div>
  )
}

export default PostCard