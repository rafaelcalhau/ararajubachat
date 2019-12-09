import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

import { logout } from '../store/ducks/user/actions'
import Logo from '../assets/images/logo.png'
import { appName } from '../config/settings.json'

export default function Headerbar () {
  const dispatch = useDispatch()
  const doLogout = () => dispatch(logout())
  const user = useSelector(state => state.user.data)

  return (
    <header className='topbar'>
      <img src={Logo} alt={appName} className='logo' />

      <Menu className='user' compact icon pointing>
        <Dropdown item icon='user' labeled simple text={user.name}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name='cog' />
              <span className='text'>Settings</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={doLogout}>
              <Icon name='sign out' />
              <span className='text'>Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </header>
  )
}
