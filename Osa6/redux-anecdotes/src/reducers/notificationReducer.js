let timeoutID;

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const text = action.data.text
      return text
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (text, time) => {
  clearTimeout(timeoutID)
  const milliseconds = time * 1000
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { text }
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, milliseconds)
  }
}

export default notificationReducer