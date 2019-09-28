import React, { useState } from 'react'
import { mount } from 'enzyme'

import Button from '../../../components/material/Button'
import FormLogin from '../../../components/forms/FormLogin'

describe('<FormLogin />', () => {
  let wrapper
  const changeForm = jest.fn()

  beforeEach(() => {
    wrapper = mount(<FormLogin changeForm={formName => changeForm(formName)} />)
  })

  afterEach(() => jest.clearAllMocks())

  it('should have 2 fields: username and password', () => {
    expect(wrapper.find('input').length).toEqual(2)
    expect(wrapper.find('input').at(0).prop('type')).toEqual('text')
    expect(wrapper.find('input').at(0).prop('id')).toBe('username')
    expect(wrapper.find('input').at(1).prop('type')).toEqual('password')
    expect(wrapper.find('input').at(1).prop('id')).toBe('password')
  })

  it('should the fields username and password values be handled by component state', () => {
    const inputUsername = wrapper.find('input').at(0)
    const inputPassword = wrapper.find('input').at(1)

    inputUsername.simulate('change', {
      target: { value: 'rafael' }
    })

    expect(inputUsername.getDOMNode().value).toBe('rafael')

    inputPassword.simulate('change', {
      target: { value: '123123' }
    })

    expect(inputPassword.getDOMNode().value).toBe('123123')
  })

  it('should have 4 buttons', () => {
    expect(wrapper.find('button').length).toEqual(4)
  })

  it('should have 2 action buttons: Sign In and Sign Up', () => {
    expect(wrapper.find(Button).at(0).find('span').at(0).text()).toEqual('Sign In')
    expect(wrapper.find(Button).at(1).find('span').at(0).text()).toEqual('Sign Up')
  })

  it('should visibility button change input password type between password and text', () => {
    expect(wrapper.find('button').at(1).simulate('click'))
    expect(wrapper.find('input').at(1).prop('type')).toEqual('text')
    expect(wrapper.find('button').at(1).simulate('click'))
    expect(wrapper.find('input').at(1).prop('type')).toEqual('password')
  })

  it('should "Sign Up" button call changeForm', (done) => {
    expect(wrapper.find(Button).at(1).simulate('click'))
    setTimeout(() => {
      expect(changeForm.mock.calls[0][0]).toBe('signup')
      done()
    }, 500)
  })
})
