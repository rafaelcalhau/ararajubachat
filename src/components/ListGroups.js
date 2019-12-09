import React from 'react'

export default function ListGroups ({ id, data }) {
  return (
    <ul id={id}>
      {
        data.map(group => (
          <li key={group._id}>
            <strong>{group.name}</strong><br />
            <small>{group.description}</small>
          </li>
        ))
      }
    </ul>
  )
}
