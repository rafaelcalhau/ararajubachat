import React from 'react'
import { mount } from 'enzyme'

import Button from '../../../components/material/Button'
import FormLogin from '../../../components/forms/FormLogin'

describe('<FormLogin />', () => {
  it('should have 2 fields: username and password', () => {
    const changeForm = jest.fn()
    const wrapper = mount(<FormLogin changeForm={formName => changeForm(formName)} />)

    expect(wrapper.find('input').length).toEqual(2)
    expect(wrapper.find('input').at(0).prop('type')).toEqual('text')
    expect(wrapper.find('input').at(0).prop('id')).toBe('username')
    expect(wrapper.find('input').at(1).prop('type')).toEqual('password')
    expect(wrapper.find('input').at(1).prop('id')).toBe('password')
  })

  it('should have 4 buttons', () => {
    const changeForm = jest.fn()
    const wrapper = mount(<FormLogin changeForm={formName => changeForm(formName)} />)

    expect(wrapper.find('button').length).toEqual(4)
  })

  it('should have 2 action buttons: Sign In and Sign Up', () => {
    const changeForm = jest.fn()
    const wrapper = mount(<FormLogin changeForm={formName => changeForm(formName)} />)

    expect(wrapper.find(Button).at(0).find('span').at(0).text()).toEqual('Sign In')
    expect(wrapper.find(Button).at(1).find('span').at(0).text()).toEqual('Sign Up')
  })

  it('should visibility button change input password type between password and text', () => {
    const changeForm = jest.fn()
    const wrapper = mount(<FormLogin changeForm={formName => changeForm(formName)} />)

    expect(wrapper.find('button').at(1).simulate('click'))
    expect(wrapper.find('input').at(1).prop('type')).toEqual('text')
    expect(wrapper.find('button').at(1).simulate('click'))
    expect(wrapper.find('input').at(1).prop('type')).toEqual('password')
  })

  it('should "Sign Up" button call changeForm', (done) => {
    const changeForm = jest.fn()
    const wrapper = mount(<FormLogin changeForm={formName => changeForm(formName)} />)

    // Is changeForm called after click on "SignUp" button?
    expect(wrapper.find(Button).at(1).simulate('click'))
    setTimeout(() => {
      expect(changeForm.mock.calls[0][0]).toBe('signup')
      done()
    }, 500)
  })
})
