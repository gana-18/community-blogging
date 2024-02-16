import React from 'react'
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Article from '../components/Article';
function TopicPage() {
    const {posts}=useSelector((state) => state.post);
    //get topic from params
    const {id}=useParams();

    const topicPosts = posts?.filter((post) => post.topic === id);

    const cards = topicPosts?.map(item => (
        <Article
          key={item._id}
          item={item}
        />
      ));

      const style={
        margin:'20px',
      }
  return (
    <div className='home1'>
        <h1 style={style}>Read blogs on {id.toUpperCase()}</h1>
        <div className='home11'>
            {cards}
        </div>
    </div>
  )
}

export default TopicPage