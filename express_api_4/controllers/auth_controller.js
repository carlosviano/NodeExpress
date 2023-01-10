import checkEmailPassword from "../helpers/check_email_password.js"

const controller = {}


controller.authPublic = (req,res) => {
    res.send('Endpoint público')
}

controller.authAuthenticated = (req,res) => {
    const { email, password } = req.body

    if (!email || !password) return res.sendStatus(400)
  
    try {
      const user = checkEmailPassword(email, password)
      return res.send(`Usuario ${user.name} autenticado`)
    } catch (err) {
      return res.sendStatus(401)
    }
}

controller.authAuthorizated = (req,res) => {
    const { email, password } = req.body

    if (!email || !password) return res.sendStatus(400)
  
    try {
      const user = checkEmailPassword(email, password)
      if (user.role !== 'admin') return res.sendStatus(403)
      return res.send(`Usuario ${user.name} es admin`)
    } catch (err) {
      return res.sendStatus(401)
    }
}

export default controller