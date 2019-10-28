import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

const InputIcon = (props) => {
  const Icon = props.icon

  return (
    <InputAdornment position={props.position || 'end'}>
      <IconButton tabIndex={props.tabIndex || -1} style={props.color && { color: props.color }}>
        <Icon />
      </IconButton>
    </InputAdornment>
  )
}

InputIcon.propTypes = {
  color: PropTypes.oneOf(['green', 'red']),
  position: PropTypes.oneOf(['start', 'end'])
}

export default InputIcon
