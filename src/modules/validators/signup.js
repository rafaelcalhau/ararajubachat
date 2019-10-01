export default (data) => {
  const { firstname, lastname, username, password, passwordConfirm } = data
  const errors = {}

  if (firstname.length <= 2) {
    errors.firstname = 'Firstname must has atleast 2 characters.'
  }

  if (lastname.length <= 2) {
    errors.lastname = 'Lastname must atleast 2 characters.'
  }

  if (username.length <= 2) {
    errors.username = 'Username must atleast 2 characters.'
  }

  if (password.length <= 2) {
    errors.password = 'Password must atleast 2 characters.'
  }

  if (passwordConfirm.length <= 2) {
    errors.passwordConfirm = 'Password must has atleast 2 characters.'
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Your password does not match with confirmation.'
  }

  if (!Object.keys(errors).length) {
    return { success: true }
  }

  return { success: false, errors }
}
