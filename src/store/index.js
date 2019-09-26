const INITIAL_STATE = {
  user: null
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type, value } = action
  console.log('reducer:', 'type', type, 'value', value)

  switch (type) {
    default:
      return state
  }
}

export default reducer
