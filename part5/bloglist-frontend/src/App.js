import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ConfirmNotif from './components/Confirm'
import ErrorNotif from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [newBlog, setNewBlog] = useState({
    "title": '',
    "author": '',
    "url": ''
  })
  const [message, setMessage] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('The login is', username, password)
      window.localStorage.setItem(
        'token', user.token
      )
      setUser(username)
      setUsername('')
      setPassword('')
      console.log("Active user is", user)
    } catch (exception) {
      setMessage("Login Failed")
      console.log("Thing happened")
    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      console.log(newBlog)
      const addition = await blogService.create(newBlog)
      setNewBlog({
        "title": '',
        "author": '',
        "url": ''
      })
      setMessage('Addition Successful')
      window.location.reload()
    } catch (e) {
      console.log("Addition fucked up")
    }

  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    blogService.setToken(window.localStorage.getItem('token'))
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.username)
    }
  }, [])
  const loginForm = () => (
    <div>
      <ErrorNotif message={message} setMessage={setMessage} />
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
  const displayBlog = () => (
    <div>
      <ConfirmNotif message={message} setMessage={setMessage} />
      <h3>{user} is logged in</h3>
      <button onClick={handleLogout}>Logout</button>
      <div><br /></div>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => {
              const tempBlog = { ...newBlog }
              tempBlog.title = target.value
              setNewBlog(tempBlog)
            }}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => {
              const tempBlog = { ...newBlog }
              tempBlog.author = target.value
              setNewBlog(tempBlog)
            }}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => {
              const tempBlog = { ...newBlog }
              tempBlog.url = target.value
              setNewBlog(tempBlog)
            }}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  return (
    <div>
      <h2>blogs</h2>
      {
        user === '' ?
          loginForm() :
          displayBlog()
      }
    </div>
  )
}

export default App