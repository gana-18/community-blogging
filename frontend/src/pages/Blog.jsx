import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { useEffect } from 'react';
import { selectUser } from '../reducers/authReducer';
const BlogInput = () => {
  const user = useSelector(selectUser);
  console.log(user);
  const [blogData, setBlogData] = useState({
    title: '',
    content: 'Start your Blog',
    coverImage: null,
    topic: ''
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/post/create/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON data
      },
      body: JSON.stringify(blogData),
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
        apiKey='pg6uipndbhqb5e6kzo0dme3xh0gk8q7q4v8tpkeqa8r28m19'
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
      <button className='submit-blog' onClick={handleSubmit}>Publish🚀</button>
      </div>
    </div>
    </>
  );
};

export default BlogInput;
