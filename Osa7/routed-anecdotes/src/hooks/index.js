import { useState } from 'react'

export const useField = (type) => {
  const [formValue, setFormValue] = useState('')

  const onChange = (event) => {
    if (event.target.type === 'reset') {
      setFormValue('')
    } else {
      setFormValue(event.target.value)
    }
  }

  return {
    type,
    value: formValue,
    onChange
  }
}