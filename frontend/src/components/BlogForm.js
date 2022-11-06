const BlogForm = ({
  handleAddNewBlog,
  handleCancelAddNewBlog
}) => {
  return (
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
      <button type="submit">add</button>
      <button type="reset" onClick={handleCancelAddNewBlog}>cancel</button>
    </form>
  )
}

export default BlogForm