import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorBar from './components/Errorbar'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [updateMessage, setUpdateMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const showMessage = (setStateFunction, message) => {
    const timeout = 5000

    setStateFunction(message)
      setTimeout(() => {
        setStateFunction('')
      }, timeout)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      showMessage(setErrorMessage, ('Wrong credentials'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    const newReturnedBlog = await blogService.create(newBlog, user)

    setBlogs(blogs.concat(newReturnedBlog))

    showMessage(setUpdateMessage, ('Added new blog'))
    
  }

  const loginForm = () => {
    return (
      <div>

      < ErrorBar message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>

    </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
        <button onClick={handleLogout} >logout</button>
        </p>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const addNewBlog = () => {
    return (
      <div>
        < Notification message={updateMessage} />

        <form onSubmit={handleAddNewBlog}>
          <div>
            title: 
            <input
              type="text"
              name="title"
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
            />
          </div>
          <button type="submit">add a new blog</button>
        </form>
      </div>
    )
  }

  const loggedUserView = () => {
    return (
      <div>
        {blogList()}
        {addNewBlog()}
      </div>
    )
  }

  return (
    <div>
      { 
        user === null ?
        loginForm() :
        loggedUserView()
      }
    </div>
  )
}

export default App
