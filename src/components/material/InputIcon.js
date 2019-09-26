import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

export default function InputIcon (props) {
  const Icon = props.icon

  return (
    <InputAdornment position={props.position || 'end'}>
      <IconButton>
        <Icon />
      </IconButton>
    </InputAdornment>
  )
}
