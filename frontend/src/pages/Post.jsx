import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuthor } from '../actions/postActions';
import PostCard from '../components/PostCard';

function Post() {
  const { id } = useParams();

  const { posts } = useSelector((state) => state.post);
  const {author} = useSelector((state) => state.post);
  const [userPost, setUserPost] = useState(null);


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostAndAuthor = async () => {
      // Fetch the specific post by filtering the posts array using the 'id'
      const userPostById = posts.find(post => post._id === id);

      if (userPostById) {
        // If the post is found, set the userPost state to the post
        setUserPost(userPostById);
        // If the post is found, dispatch the 'fetchAuthor' action with the userPost.user
        dispatch(fetchAuthor(userPostById.user));
      }
    };

    fetchPostAndAuthor();
  }, [id, dispatch, posts]);
  return (
    <div className='post'>
      <PostCard
        item={userPost}
        author={author}
        key={userPost?._id}
      />
    </div>
  );
}

export default Post;
