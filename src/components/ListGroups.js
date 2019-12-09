import React from 'react'
import PropTypes from 'prop-types'

const ListGroups = ({ id, data, loaded, textEmpty }) => {
  if (loaded && !data.length) {
    return (
      <small>{textEmpty}</small>
    )
  }

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

ListGroups.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  loaded: PropTypes.bool,
  textEmpty: PropTypes.string
}

export default ListGroups
