import checkUser from "../helpers/check_user.js";


const controller = {};


controller.userList = (req,res) => {
    const { guid } = req.params

    try{
    const user = checkUser (guid)
    res.send(user.eyeColor)
    } catch(err){
      return res.status(404).send
    }
}

controller.userUpdate = (req,res) => {
    const {guid} = req.params;
 const {eyeColor} = req.body

 if(!eyeColor) return res.status(400)

 try{
  const user = checkUser(guid);
  if (user.role !== 'admin'){
    return res.sendStatus(403)} 
    else{
      user.eyeColor = eyeColor

      res.send(user)
    };
 } catch(err){
  return res.sendStatus(400).send
 }
}

export default controller;