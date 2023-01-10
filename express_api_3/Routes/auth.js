import express from 'express'
// import { USERS_BBDD } from "../bbdd.js"

import checkEmailPassword from '../helpers/check_email_password.js'

const authRouter = express.Router()

authRouter.get('/public', (req, res) => res.send('Endpoint público'))

// Endpoint autenticado para todo usuario registrado

authRouter.post('/autenticado', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.sendStatus(400)

  // const user = USERS_BBDD.find(user => user.email === email);
  // if(!user) return res.sendStatus(401);
  // if(user.password !== password) return res.sendStatus(401);
  // res.send(`Usuario ${user.name} autenticado`)

  try {
    const user = checkEmailPassword(email, password)
    return res.send(`Usuario ${user.name} autenticado`)
  } catch (err) {
    return res.sendStatus(401)
  }
})

authRouter.post('/autorizado', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.sendStatus(400)

  // const user = USERS_BBDD.find(user => user.email === email);
  // if(!user) return res.sendStatus(401);
  // if(user.password !== password) return res.sendStatus(401);
  // if(user.role !== 'admin') return res.sendStatus(403);
  // res.send(`El usuario ${user.name} es admin`)

  try {
    const user = checkEmailPassword(email, password)
    if (user.role !== 'admin') return res.sendStatus(403)
    return res.send(`Usuario ${user.name} es admin`)
  } catch (err) {
    return res.sendStatus(401)
  }
})
export default authRouter
