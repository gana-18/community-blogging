import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { selectUser } from '../reducers/authReducer';
import { useParams } from 'react-router-dom';
const EditBlog = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.post);
  const user = useSelector(selectUser);
  const [draft, setDraft] = useState([]);
  const postData=posts.find(post=>post._id===id)

  useEffect(() => {
    if (!postData) {
      const getDrafts = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/draft/${id}`, { method: 'GET' });
          const data = await res.json();
          setDraft(data);
          // Set the initial state of blogData here with the fetched draft data
          setBlogData({
            title: data.title,
            content: data.content,
            coverImage: data.coverImage,
            topic: data.topic
          });
        } catch (error) {
          console.log(error);
        }
      }
      getDrafts();
    }
  }, [postData, user._id, id]);
  

  const [blogData, setBlogData] = useState({
    title: postData?.title,
    content: postData?.content,
    coverImage: postData?.overImage,
    topic: postData?.topic
  });
  const editorRef = useRef();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle image file separately
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBlogData((prevData) => ({
            ...prevData,
            coverImage: reader.result, // Store the image URL in state
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBlogData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditorChange = (content, editor) => {
    setBlogData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };

  const handleSubmit = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/post/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON data
      },
      body: JSON.stringify({...blogData,published:true}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog submitted successfully:', data);
        window.open('/home',"_self") // Redirect to the home page
      })
      .catch((error) => {
        console.error('Error submitting blog:', error);
      });
  };
  const handleDraft = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/post/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON data
      },
      body: JSON.stringify({...blogData,published:false}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog drafted successfully:', data);
        window.open('/home',"_self") // Redirect to the home page
      })
      .catch((error) => {
        console.error('Error submitting blog:', error);
      });
  };

  return (
    <>
    <div className='blog'>
      <div className='editor'>
      <div className='a-title'>
        <input type="text" name="title" value={blogData.title} onChange={handleChange} placeholder="Article Title..." />
      </div>
      <div className='blog-topic'>
        <input type="text" name="topic" value={blogData.topic} onChange={handleChange} placeholder="Blog Topic..." />
      </div>
      <div className='cover-image'>
        <label>Cover Image</label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleChange}/>
        {blogData.coverImage && (
          <img src={blogData.coverImage} alt="Cover Preview" style={{ maxWidth: '100px' }} />
        )}
      </div>
      <Editor
        apiKey={import.meta.env.VITE_EDITOR_API}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={blogData.content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor |'+
                    'alignleft aligncenter alignright alignjustify | '+
                    'bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />
      <button className='submit-blog' onClick={handleDraft}>Save as Draft📝</button>
      <button className='submit-blog' onClick={handleSubmit}>Save & Publish🚀</button>
      </div>
    </div>
    </>
  );
};

export default EditBlog;
