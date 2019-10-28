import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

export default function VisibilityIcon (props) {
  const [Default, Off] = props.icons
  const [isVisible, setVisibility] = useState(false)

  const handleClickShowPassword = () => {
    const newState = !isVisible
    setVisibility(newState)

    if (props.handleVisibility) {
      props.handleVisibility(newState)
    }
  }

  return (
    <InputAdornment position='end'>
      <IconButton tabIndex={props.tabIndex || -1} onClick={handleClickShowPassword}>
        {
          !isVisible ? <Default /> : <Off />
        }
      </IconButton>
    </InputAdornment>
  )
}
