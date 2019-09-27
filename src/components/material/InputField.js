import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import InputIcon from './InputIcon'
import VisibilityIcon from './VisibilityIcon'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(0)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: 200
  }
}))

function InputField (props) {
  const classes = useStyles()
  const Icon = props.icon || null
  const [isVisible, setVisibility] = useState(false)
  const VisibilityIcons = props.visibilityIcons || null

  const handleChange = (e) => {
    const { value } = e.target

    if (props.handleChange) {
      props.handleChange(value)
    }
  }

  const handleVisibility = (visibility) => {
    setVisibility(visibility)
  }

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      style={props.full && { width: '100%' }}
    >
      <InputLabel
        style={{ marginTop: 13, paddingLeft: 15 }}
        htmlFor={props.id}
      >
        {props.label}
      </InputLabel>
      <Input
        autoComplete={props.autoComplete || 'off'}
        id={props.id}
        type={props.isSecure && !isVisible ? 'password' : 'text'}
        value={props.value}
        style={{ paddingTop: 14, paddingRight: 0, paddingBottom: 0, paddingLeft: 14 }}
        onChange={handleChange}
        endAdornment={
          Icon
            ? <InputIcon icon={Icon} />
            : (VisibilityIcons ? <VisibilityIcon handleVisibility={handleVisibility} icons={VisibilityIcons} /> : null)
        }
      />
    </FormControl>
  )
}

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string
}

export default InputField
