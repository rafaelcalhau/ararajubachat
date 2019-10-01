import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { SnackbarProvider } from 'notistack'

import Button from '../../../components/material/Button'
import InputField from '../../../components/material/InputField'
import FormSignup from '../../../components/forms/FormSignup'
import { regexList } from '../../../config/settings.json'
import { registerUser, verifyUsername } from '../../../store/actions/user'
import reducer from '../../../store'
import validator from '../../../modules/validators/signup'

describe('<FormSignup />', () => {
  let buttonBack, buttonCreate
  let wrapper, inputFirstname, inputLastname, inputUsername, inputPassword, inputPasswordConfirm
  const changeForm = jest.fn()
  const originalError = console.error
  const store = createStore(reducer, applyMiddleware(thunk))

  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <SnackbarProvider>
          <FormSignup changeForm={formName => changeForm(formName)} />
        </SnackbarProvider>
      </Provider>
    )

    buttonCreate = wrapper.find(Button).at(0)
    buttonBack = wrapper.find(Button).at(1)
    inputFirstname = wrapper.find('input').at(0)
    inputLastname = wrapper.find('input').at(1)
    inputUsername = wrapper.find('input').at(2)
    inputPassword = wrapper.find('input').at(3)
    inputPasswordConfirm = wrapper.find('input').at(4)

    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterEach(() => jest.clearAllMocks())

  afterAll(() => {
    console.error = originalError
  })

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
    expect(buttonBack.find('span').at(0).text()).toEqual('Back')
    expect(buttonCreate.find('span').at(0).text()).toEqual('Create')
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
    expect(buttonCreate.props().disabled).toBeTruthy()
  })

  it('should "Sign Up" button call changeForm', (done) => {
    buttonBack.simulate('click')

    setTimeout(() => {
      expect(changeForm.mock.calls[0][0]).toBe('login')
      done()
    }, 500)
  })

  it('should the field username accept only the pattern [a-z0-9] starting always by a letter', () => {
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

  it('should a verification for available username be performed on blur event of the field username', (done) => {
    let callNumber = 0
    const data = {}
    const dispatch = jest.fn(params => {
      if (callNumber === 0) {
        expect(params).toEqual({ type: 'VERIFY_USERNAME_REQUEST' })
      } else if (callNumber === 1) {
        expect(params).toEqual({ type: 'VERIFY_USERNAME_SUCCESS', data })

        done()
      }

      callNumber++
    })

    inputUsername = wrapper.find('input').at(2)
    inputUsername.simulate('change', {target: {value: 'justAnInvalidUsername'}})
    inputUsername.simulate('blur')

    const apiClientMock = {
      get: jest.fn(() => Promise.resolve({ data }))
    }
    
    verifyUsername(apiClientMock)(dispatch)
  })

  it('should the "Create" button stay enabled only if all fields are filled', () => {
    expect(buttonCreate.prop('disabled')).toBeTruthy()

    for (let i = 0; i < 5; i++) {
      wrapper.find('input').at(i).simulate('change', {target: {value: 'a'}})
      expect(wrapper.find('input').at(i).getDOMNode().value.length).toEqual(1)
    }

    expect(wrapper.find('button.Mui-disabled').length).toEqual(0)
  })

  it('should validate all fields and request a new user registration', (done) => {
    let callNumber = 0
    const data = {}
    const dispatch = jest.fn(params => {
      if (callNumber === 0) {
        expect(params).toEqual({ type: 'REGISTER_USER_REQUEST' })
      } else if (callNumber === 1) {
        expect(params).toEqual({ type: 'REGISTER_USER_SUCCESS', data })

        done()
      }

      callNumber++
    })

    // Firstname
    wrapper.find('input').at(0).simulate('change', {target: {value: 'Rafael'}})
    data.firstname = wrapper.find('input').at(0).getDOMNode().value

    // Lastname
    wrapper.find('input').at(1).simulate('change', {target: {value: 'Calhau'}})
    data.lastname = wrapper.find('input').at(1).getDOMNode().value

    // Username
    wrapper.find('input').at(2).simulate('change', {target: {value: 'rafaelcalhau'}})
    data.username = wrapper.find('input').at(2).getDOMNode().value

    // Password
    wrapper.find('input').at(3).simulate('change', {target: {value: '123456'}})
    data.password = wrapper.find('input').at(3).getDOMNode().value

    // Confirm Password
    wrapper.find('input').at(4).simulate('change', {target: {value: '123456'}})
    data.passwordConfirm = wrapper.find('input').at(4).getDOMNode().value

    const validation = validator(data)
    expect(validation.success).toBeTruthy()

    const apiClientMock = {
      post: jest.fn(() => Promise.resolve({ data }))
    }
    
    registerUser(apiClientMock, data)(dispatch)
  })
})