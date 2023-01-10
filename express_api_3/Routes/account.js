import express from 'express'
import { USERS_BBDD } from '../bbdd.js'

const accountRouter = express.Router()

accountRouter.use((req, res, next) => {
  console.log('Middleware executed')
  next()
})

accountRouter.get('/:guid', (req, res) => {
  const { guid } = req.params
  const user = USERS_BBDD.find((user) => user.guid === guid)

  if (!user) {
    return res.status(404).send
  }

  res.send(user)
})

// Crear una cuenta nueva a partir del guid y de name
accountRouter.post('/', (req, res) => {
  const { guid, name } = req.body
  if (!guid || !name) return res.status(400).send()
  const user = USERS_BBDD.find((user) => user.guid === guid)
  if (user) return res.status(409).send()
  USERS_BBDD.push({ guid, name })

  res.send()
})

// Actualizar el nombre de una cuenta
accountRouter.patch('/:guid', (req, res) => {
  const { guid } = req.params
  const { name } = req.body

  if (!name) return res.status(400)

  const user = USERS_BBDD.find((user) => user.guid === guid)

  if (!user) return res.status(404).send()

  user.name = name
  res.send(user)
})

// Eliminar una cuenta
accountRouter.delete('/:guid', (req, res) => {
  const { guid } = req.params
  const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid)
  if (userIndex === -1) return res.status(404).send()
  USERS_BBDD.splice(userIndex, 1)
  res.send('Usuario eliminado')
})

export default accountRouter
