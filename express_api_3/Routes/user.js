import express from 'express';

import checkUser from '../helpers/check_user.js'
import checkEmailPassword from '../helpers/check_email_password.js'

const userRouter = express.Router();
// edad , color de ojo

userRouter.get('/:guid',(req,res) => {

  const { guid } = req.params

    try{
    const user = checkUser(guid)
    res.send(user.eyeColor)
    } catch(err){
      return res.status(404).send
    }
})

userRouter.patch('/account/:guid',(req,res)=>{
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
})


export default userRouter