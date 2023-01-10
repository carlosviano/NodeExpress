import { USERS_BBDD } from "../bbdd.js"


const controller = {}

controller.listUser = (req, res) => {
    const { guid } = req.params
    const user = USERS_BBDD.find((user) => user.guid === guid)
  
    if (!user) {
      return res.status(404).send
    }
  
    res.send(user)
}

controller.addUser = (req,res) => {
    const { guid, name } = req.body
    if (!guid || !name) return res.status(400).send()
    const user = USERS_BBDD.find((user) => user.guid === guid)
    if (user) return res.status(409).send()
    USERS_BBDD.push({ guid, name })
  
    res.send()
}

controller.updateUser = (req,res) => {
    const { guid } = req.params
    const { name } = req.body
  
    if (!name) return res.status(400)
  
    const user = USERS_BBDD.find((user) => user.guid === guid)
  
    if (!user) return res.status(404).send()
  
    user.name = name
    res.send(user)
}

controller.deleteUser = (req,res) => {
    const { guid } = req.params
    const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid)
    if (userIndex === -1) return res.status(404).send()
    USERS_BBDD.splice(userIndex, 1)
    res.send('Usuario eliminado')
}



export default controller