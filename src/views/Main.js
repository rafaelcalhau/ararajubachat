import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Header, Tab } from 'semantic-ui-react'
import Headerbar from '../components/Headerbar'
import ListGroups from '../components/ListGroups'
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
      return (
        <ListGroups
          id='publicGroups'
          data={publicGroups.data}
          loaded={publicGroups.isLoaded}
          empty='No groups available.'
        />
      )
    } else {
      return (
        <ListGroups
          id='privateGroups'
          data={privateGroups.data}
          loaded={privateGroups.isLoaded}
          empty={() => (
            <>
              No private groups.
              <Header.Subheader>
                <Button basic>New Group</Button>
              </Header.Subheader>
            </>
          )}
        />
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
