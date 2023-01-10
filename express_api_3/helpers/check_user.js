import { USERS_BBDD } from '../bbdd.js'

const checkUser = (guid) => {
  // Validacion del email y password
  const user = USERS_BBDD.find(user => user.guid === guid)

  if (!user) throw new Error()

  return user
}

export default checkUser