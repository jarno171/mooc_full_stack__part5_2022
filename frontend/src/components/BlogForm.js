import { useState } from 'react'

const BlogForm = ({
  handleAddNewBlog,
  handleCancelAddNewBlog
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()

    handleAddNewBlog(newTitle, newAuthor, newUrl)
  }

  const cancelAdd = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    handleCancelAddNewBlog()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: 
        <input
          type="text"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          name="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          name="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          name="url"
        />
      </div>
      <button type="submit">add</button>
      <button type="reset" onClick={cancelAdd}>cancel</button>
    </form>
  )
}

export default BlogForm