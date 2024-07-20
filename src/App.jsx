import { useFormik } from 'formik';
import React, { useState } from 'react'



const App = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);


  const formik = useFormik({
    initialValues: {
      post: ''
    },
    onSubmit: (values) => {
      if (isEditing) {
        setPosts((prev) => prev.map((post, index) => index === currentPostIndex ? values.post : post));
        setIsEditing(false);
        setCurrentPostIndex(null);
      } else {
        setPosts((prev) => [...prev, values.post]);
      }
      formik.resetForm();
    }
  });

  const postDelete = (index) => {
    setPosts((prev) => prev.filter((_, i) => i !== index));
    if (isEditing && currentPostIndex === index) {
      setIsEditing(false);
      setCurrentPostIndex(null);
      formik.resetForm();
    }
  }

  const postEdit = (index) => {
    setIsEditing(true);
    setCurrentPostIndex(index);
    formik.setFieldValue('post', posts[index]);
  }

  return (
    <div className='flex flex-col items-center gap-5'>
      <h1>To-Do App</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='space-x-4'>
          <input
            className='w-[400px] p-2'
            type="text"
            name="post"
            value={formik.values.post}
            onChange={formik.handleChange} />
          {
            isEditing ?
              <button type='submit' className='bg-red-500'>Update post</button> : <button type='submit'>Submit post</button>}
        </div>
      </form >

      {posts.map((post, i) => {
        return (
          <div key={i} className='flex items-center gap-5 px-5'>
            <div className='p-2 shadow-sm shadow-gray-700 mb-2'>
              <span className='w-[500px]'>{post}</span>
            </div>
            <div className='space-y-2'>
              <button className='px-4 py-2 bg-gray-500' onClick={() => postEdit(i)}>Edit</button>
              <button className='px-2 py-2 bg-red-500 ' onClick={() => postDelete(i)}>Delete</button>
            </div>
          </div>
        );
      })}

    </div>
  )
}

export default App


