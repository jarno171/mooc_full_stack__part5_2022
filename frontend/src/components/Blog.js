import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({blog, setBlogsSorted, blogsInApp, setBlogsInApp}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const updatedBlog = {...blog, likes: likes + 1 }

    await blogService.update(updatedBlog)

    const findBlog = blogsInApp.find(blog => blog.id === updatedBlog.id)
    findBlog.likes += 1

    setLikes(likes + 1)
    setBlogsSorted(false)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(blog)

      setBlogsInApp(blogsInApp.filter(appBlog => appBlog.id !== blog.id))
    }
  }

  return (
    <>
      <div style={blogStyle}>
        <div>
          <p>{blog.title}</p>
          <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
          <button style={showWhenVisible} onClick={toggleVisibility}>close</button>
        </div>
        
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={addLike}>like</button></p>
          <p>{blog.author}</p>
          <button style={showWhenVisible} onClick={deleteBlog}>delete</button>
        </div>
      </div> 
    </> 
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogsSorted: PropTypes.func.isRequired,
  blogsInApp: PropTypes.array.isRequired,
  setBlogsInApp: PropTypes.func.isRequired,
}

export default Blog