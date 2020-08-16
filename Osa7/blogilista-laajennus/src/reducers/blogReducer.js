import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_NEW':
      return [...state, action.data]
    case 'UPDATE_BLOG': {
      const changedBlog = action.data
      return state.map(blog =>
        blog.id !== changedBlog.id ? blog : changedBlog)
    }
    case 'DELETE_BLOG': {
      const id = action.data
      return state.filter(b => b.id !== id)
    }
    default:
      return state
  }
}

export const addNewBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_NEW',
      data: newBlog
    })
  }
}

export const addNewComment = (comment, blog) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.comment(blog.id, comment)
      dispatch({
        type: 'UPDATE_BLOG',
        data: commentedBlog
      })
      dispatch(setNotification('Thanks for commenting!', 'success'))
    } catch (error) {
      dispatch(setNotification(`Blog '${blog.title}' was already removed from the server`, 'danger'))
    }
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = { ...blog, likes: (blog.likes + 1) }
      const updatedBlog = await blogService.update(blog.id, likedBlog)

      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(setNotification('Thanks for liking!', 'success'))
    } catch (error) {
      dispatch(setNotification(`Blog '${blog.title}' was already removed from the server`, 'danger'))
    }
  }
}

// export const removeBlog = (blog) => {
//   const id = blog.id
//   return async dispatch => {
//     try {
//       await blogService.remove(id)
//       dispatch({
//         type: 'DELETE_BLOG',
//         data: id
//       })
//       dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed!`, 'success'))
//     } catch (error) {
//       dispatch(setNotification(`Blog '${blog.title}' was already removed from the server`, 'danger'))
//       dispatch(initializeBlogs())
//     }
//   }
// }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer