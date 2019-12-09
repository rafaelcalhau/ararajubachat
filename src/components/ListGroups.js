import React from 'react'
import PropTypes from 'prop-types'
import { Header, Icon } from 'semantic-ui-react'

const ListGroups = ({ id, data, loaded, empty }) => {
  if (loaded && !data.length) {
    if (typeof empty === 'string') {
      return (
        <div className='center aligned no-content'>
          <Header as='h4' icon>
            <Icon disabled name='group' />
            {empty}
          </Header>
        </div>
      )
    } else {
      return (
        <div className='center aligned no-content'>
          <Header as='h4' icon>
            <Icon disabled name='group' />
            {empty()}
          </Header>
        </div>
      )
    }
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
  empty: PropTypes.string | PropTypes.func,
  loaded: PropTypes.bool
}

export default ListGroups
