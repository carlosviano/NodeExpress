import userModel from "../services/schemas/user_schema.js"


const controller = {}

controller.listUser = async(req, res) => {
    const { guid } = req.params

    const user = await userModel.findById(guid)
  
    if (!user) {
      return res.status(404).send('El usuario no existe')
    }
  
    res.send(user)
}

controller.addUser = async (req,res) => {
    const { guid, name, email,password, role} = req.body
    if (!guid || !name) return res.status(400).send()
    const user = await userModel.findById(guid)
    if (user) return res.status(409).send('Usuario ya registrado')
    const newUser = new userModel({_id: guid, name,email,password,role})
    await newUser.save();  
    return res.send('Usuario registrado')
}

controller.updateUser = async(req,res) => {
    const { guid } = req.params
    const { name } = req.body
  
    if (!name) return res.status(400)
  
    const user = await userModel.findById(guid)
  
    if (!user) return res.status(404).send('El usuario no existe')
  
    user.name = name
    await user.save()
    res.send(user)
}

controller.deleteUser = async(req,res) => {
    const { guid } = req.params
    const user = await userModel.findById(guid);
    if (!user) return res.status(404).send('El usuario no existe')
    await user.remove();
    res.send('Usuario eliminado')
}



export default controller