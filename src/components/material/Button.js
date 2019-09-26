import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: '#0D9730',
    color: 'white',
    margin: 0
  },
  input: {
    display: 'none'
  }
}))

export default function MaterialButton (props) {
  const classes = useStyles()

  return (
    <Button
      fullWidth={props.full || false}
      variant={props.variant || 'contained'}
      className={classes.button}
      style={props.style}
    >
      {props.label}
    </Button>
  )
}
