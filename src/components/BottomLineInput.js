import React from 'react'

export default function BottomLineInput (props) {
  return (
    <input
      placeholder={props.placeholder}
      className='bottomLined'
      style={props.style}
    />
  )
}
