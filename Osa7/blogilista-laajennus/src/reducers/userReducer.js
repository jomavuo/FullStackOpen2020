import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
let user
if (loggedUserJSON) {
  user = JSON.parse(loggedUserJSON)
  blogService.setToken(user.token)
}

const userReducer = (state = user || null, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login(
        {
          username, password,
        })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
      dispatch(setNotification(`Welcome ${user.name}`, 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'danger'))
    }
  }
}

export const logOut = () => {
  window.localStorage.clear()
  return ({
    type: 'CLEAR_USER',
  })
}

export default userReducer