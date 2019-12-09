export default (data) => {
  const { username, password } = data
  const errors = {}

  if (username.length <= 2) {
    errors.username = 'Username must atleast 2 characters.'
  }

  if (password.length <= 2) {
    errors.password = 'Password must atleast 2 characters.'
  }

  if (!Object.keys(errors).length) {
    return { success: true }
  }

  return { success: false, errors }
}
