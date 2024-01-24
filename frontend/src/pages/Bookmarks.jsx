import { useSelector,useDispatch } from "react-redux";
import {useEffect,useState} from "react";
import Article from "../components/Article";
function Bookmarks() {
    const {user}=useSelector((state) => state.auth);
    const {posts}=useSelector((state) => state.post);

    const [bookmarkPosts,setBookmarkPosts]=useState([])

    useEffect(() => {
        const fetchBookmarkPosts = async () => {
            const bookmarkPostsById = posts.filter(post => user.bookmarks[post._id]);
            if (bookmarkPostsById) {
                setBookmarkPosts(bookmarkPostsById);
            }
        };
        fetchBookmarkPosts();
    }, [user,posts]);

    const cards = bookmarkPosts?.map(item => (
        <Article
          key={item._id}
          item={item}
        />
      ));

  return (
    <div className="home">
        {cards?cards:<h1>Bookmark posts to see later...</h1>}
    </div>
  )
}

export default Bookmarks