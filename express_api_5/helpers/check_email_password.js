import userModel from '../services/schemas/user_schema.js'

const checkEmailPassword = async(email, password) => {
  // Validacion del email y password
  const user = await userModel.findOne({email: email}).exec().then();

  if (!user) throw new Error()

  if (user.password !== password) throw new Error()

  return user
}

export default checkEmailPassword
