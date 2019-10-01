import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from '../App.js'
import reducer from './../store'
import { authenticateWithToken } from '../store/actions/user'

const store = createStore(reducer, applyMiddleware(thunk))

describe('<App />', () => {
  const div = document.createElement('div')

  beforeEach(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, 
      div
    )
  })

  it('renders without crashing', () => {
    ReactDOM.unmountComponentAtNode(div)
  })
  
  it('should try run a token authentication when user data is stored locally', (done) => {
    let callNumber = 0
  
    const data = {}
    const dispatch = jest.fn(params => {
      if (callNumber === 0) {
        expect(params.type).toBe('AUTH_TOKEN_REQUEST')
      } else if (callNumber === 1) {
        expect(params.type).toBe('AUTH_TOKEN_SUCCESS')
        done()
      }
  
      callNumber++
    })
  
    const apiClientMock = {
      post: jest.fn(() => Promise.resolve({ data }))
    }
    
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify({
        name: 'Rafael',
        username: 'rafaelcalhau',
        token: 'my-token'
      }))
    }

    authenticateWithToken(apiClientMock, localStorageMock)(dispatch)
  })
})
