let timeoutID

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': {
    const text = action.data.text
    const cName = action.data.cName
    return { text, cName }
  }
  case 'CLEAR_NOTIFICATION': {
    return ''
  }
  default: {
    return state
  }
  }
}

export const setNotification = (text, cName) => {
  clearTimeout(timeoutID)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { text, cName }
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)

  }
}

export default notificationReducer