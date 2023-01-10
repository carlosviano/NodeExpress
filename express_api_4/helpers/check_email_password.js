import { USERS_BBDD } from '../bbdd.js'

const checkEmailPassword = (email, password) => {
  // Validacion del email y password
  const user = USERS_BBDD.find(user => user.email === email)

  if (!user) throw new Error()

  if (user.password !== password) throw new Error()

  return user
}

export default checkEmailPassword
