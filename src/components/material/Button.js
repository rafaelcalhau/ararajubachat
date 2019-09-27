import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialButton from '@material-ui/core/Button'

import { buttons } from '../../config/styles.json'

const useStyles = makeStyles(theme => ({
  default: {
    backgroundColor: buttons.primary.bg,
    color: 'white',
    margin: 0,
    '&:hover': {
      backgroundColor: buttons.primary.bghover
    }
  },
  link: {
    background: 'none',
    boxShadow: 'none',
    margin: theme.spacing(0),
    '&:hover': {
      backgroundColor: buttons.link.bghover
    }
  },
  input: {
    display: 'none'
  }
}))

export default function Button (props) {
  const classes = useStyles()
  const buttonClass = props.buttonClass || 'default'

  return (
    <MaterialButton
      fullWidth={props.full || false}
      variant={props.variant || 'contained'}
      className={classes[buttonClass]}
      style={props.style}
    >
      {props.label}
    </MaterialButton>
  )
}
