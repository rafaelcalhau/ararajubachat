import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Tab } from 'semantic-ui-react'
import Headerbar from '../components/Headerbar'
import actions from '../store/ducks/groups/actions'

function Main () {
  const dispatch = useDispatch()
  const { public: publicGroups, private: privateGroups } = useSelector(state => state.groups)
  const { id: userId, token } = useSelector(state => state.user.data)

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
          {renderGroups('private')}
        </Tab.Pane>
      )
    }
  ]

  useEffect(() => {
    dispatch(actions.loadGroups(token))
    dispatch(actions.loadUserGroups(userId, token))
  }, []) // eslint-disable-line

  function renderGroups (type = 'public') {
    if (type === 'public') {
      if (publicGroups.isLoaded && !publicGroups.data.length) {
        return (
          <small>No groups available.</small>
        )
      }

      return (
        <>
          <Header as='h3'>Public Groups</Header>

          <ul id='publicGroups'>
            {
              publicGroups.data.map(group => (
                <li key={group._id}>
                  <strong>{group.name}</strong><br />
                  <small>{group.description}</small>
                </li>
              ))
            }
          </ul>
        </>
      )
    } else {
      if (privateGroups.isLoaded && !privateGroups.data.length) {
        return (
          <small>No private groups.</small>
        )
      }
  
      return (
        <>
          <Header as='h3'>Public Groups</Header>
  
          <ul id='privateGroups'>
            {
              privateGroups.data.map(group => (
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
