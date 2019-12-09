import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from 'semantic-ui-react'
import Headerbar from '../components/Headerbar'
import actions from '../store/ducks/groups/actions'

function Main () {
  const dispatch = useDispatch()
  const { data: groups } = useSelector(state => state.groups)
  const { token } = useSelector(state => state.user.data)

  useEffect(() => dispatch(actions.loadGroups(token)), []) // eslint-disable-line

  function renderGroups (groups) {
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
      {
        groups.length > 0 && renderGroups()
      }
    </>
  )
}

export default Main
