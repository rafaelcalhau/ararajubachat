import React from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

import Logo from '../assets/images/logo.png'
import { appName } from '../config/settings.json'

export default function Headerbar () {
  const user = useSelector(state => state.user.data)

  return (
    <header className='topbar'>
      <img src={Logo} alt={appName} className='logo' />

      <Menu className='user' compact icon pointing>
        <Dropdown item icon='user' labeled simple text={user.name}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name='users' />
              <span className='text'>Contacts</span>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name='cog' />
              <span className='text'>Settings</span>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name='sign out' />
              <span className='text'>Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </header>
  )
}
