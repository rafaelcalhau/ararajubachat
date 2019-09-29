import React from 'react'
import { mount } from 'enzyme'

import Button from '../../../components/material/Button'
import InputField from '../../../components/material/InputField'
import FormSignup from '../../../components/forms/FormSignup'
import { regexList } from '../../../config/settings.json'

describe('<FormSignup />', () => {
  let buttonBack, buttonCreate
  let wrapper, inputFirstname, inputLastname, inputUsername, inputPassword, inputPasswordConfirm
  const changeForm = jest.fn()

  beforeAll(() => {
    wrapper = mount(<FormSignup changeForm={formName => changeForm(formName)} />)

    buttonBack = wrapper.find(Button).at(0)
    buttonCreate = wrapper.find(Button).at(1)
    inputFirstname = wrapper.find('input').at(0)
    inputLastname = wrapper.find('input').at(1)
    inputUsername = wrapper.find('input').at(2)
    inputPassword = wrapper.find('input').at(3)
    inputPasswordConfirm = wrapper.find('input').at(4)
  })

  afterEach(() => jest.clearAllMocks())

  it('should have 5 fields: firstname, lastname, username, password, and confirm password', () => {
    expect(wrapper.find('input').length).toEqual(5)

    expect(inputFirstname.prop('type')).toEqual('text')
    expect(inputFirstname.prop('id')).toBe('firstname')

    expect(inputLastname.prop('type')).toEqual('text')
    expect(inputLastname.prop('id')).toBe('lastname')

    expect(inputUsername.prop('type')).toEqual('text')
    expect(inputUsername.prop('id')).toBe('username')
    
    expect(inputPassword.prop('type')).toEqual('password')
    expect(inputPassword.prop('id')).toBe('password')

    expect(inputPasswordConfirm.prop('type')).toEqual('password')
    expect(inputPasswordConfirm.prop('id')).toBe('passwordConfirm')
  })

  it('should the fields be handled by component state', () => {
    inputFirstname.simulate('change', {target: { value: 'Rafael' }})
    expect(inputFirstname.getDOMNode().value).toBe('Rafael')

    inputLastname.simulate('change', {target: { value: 'Calhau' }})
    expect(inputLastname.getDOMNode().value).toBe('Calhau')
    
    inputUsername.simulate('change', {target: { value: 'rafael' }})
    expect(inputUsername.getDOMNode().value).toBe('rafael')

    inputPassword.simulate('change', {target: { value: '123456' }})
    expect(inputPassword.getDOMNode().value).toBe('123456')

    inputPasswordConfirm.simulate('change', {target: { value: '123456' }})
    expect(inputPasswordConfirm.getDOMNode().value).toBe('123456')
  })

  it('should have 5 buttons', () => {
    expect(wrapper.find('button').length).toEqual(5)
  })

  it('should have 2 action buttons: Create and Back', () => {
    expect(buttonBack.find('span').at(0).text()).toEqual('Create')
    expect(buttonCreate.find('span').at(0).text()).toEqual('Back')
  })

  it('should visibility button change input password type between password and text', () => {
    wrapper.find('button').at(1).simulate('click')
    expect(wrapper.find('input').at(3).prop('type')).toEqual('text')
    
    wrapper.find('button').at(1).simulate('click')
    expect(wrapper.find('input').at(3).prop('type')).toEqual('password')

    wrapper.find('button').at(2).simulate('click')
    expect(wrapper.find('input').at(4).prop('type')).toEqual('text')
    
    wrapper.find('button').at(2).simulate('click')
    expect(wrapper.find('input').at(4).prop('type')).toEqual('password')
  })

  it('should "Create" button start disabled', () => {
    expect(buttonBack.props().disabled).toBeTruthy()
  })

  it('should "Sign Up" button call changeForm', (done) => {
    buttonCreate.simulate('click')

    setTimeout(() => {
      expect(changeForm.mock.calls[0][0]).toBe('login')
      done()
    }, 500)
  })

  it('should the field username accept only the pattern [a-z0-9] starting always by a letter', async () => {
    const regex = new RegExp(regexList.username)
    const allowed = ['rafael', 'rafa3l']
    const notAllowed = ['1rafael', 'Rafael', 'rafaEl']

    allowed.map(value => {
      inputUsername.simulate('change', {target: { value }})
      expect(regex.test(inputUsername.getDOMNode().value)).toBeTruthy()
      expect(wrapper.find(InputField).at(2).props().error).toBeFalsy()

      return true
    })

    notAllowed.map(value => {
      inputUsername.simulate('change', {target: { value }})
      expect(regex.test(inputUsername.getDOMNode().value)).toBeFalsy()
      expect(wrapper.find(InputField).at(2).props().error).not.toBeFalsy()

      return true
    })
  })
})
