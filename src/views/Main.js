import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Tab } from 'semantic-ui-react'
import Headerbar from '../components/Headerbar'
import actions from '../store/ducks/groups/actions'

function Main () {
  const dispatch = useDispatch()
  const { data: groups, isLoaded: groupsLoaded } = useSelector(state => state.groups)
  const { token } = useSelector(state => state.user.data)

  const panes = [
    {
      menuItem: 'Public groups',
      render: () => (
        <Tab.Pane attached>
          {renderGroups()}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'My groups',
      render: () => (
        <Tab.Pane attached>
          ...
        </Tab.Pane>
      )
    }
  ]

  useEffect(() => dispatch(actions.loadGroups(token)), []) // eslint-disable-line

  function renderGroups () {
    if (groupsLoaded && !groups.length) {
      return (
        <small>No groups available.</small>
      )
    }

    return (
      <>
        <Header as='h3'>Public Groups</Header>

        <ul id='publicGroups'>
          {
            groups.map(group => (
              <li key={group._id}>
                <strong>{group.name}</strong><br />
                <small>{group.description}</small>
              </li>
            ))
          }
        </ul>
      </>
    )
  }

  return (
    <>
      <Headerbar />
      <Tab
        className='tabnav'
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </>
  )
}

export default Main
