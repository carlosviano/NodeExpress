import checkEmailPassword from "../helpers/check_email_password.js";
import { nanoid } from 'nanoid';
import userModel from "../services/schemas/user_schema.js";

const controller = {}
const sessions = [];

controller.authSessionLogin = async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    try{
        const {guid} = await checkEmailPassword(email, password);
        const sessionId = nanoid();
        sessions.push({sessionId,guid})
        console.log(sessions)
        res.cookie('sessionId', sessionId, {httpOnly: true})
        return res.send()
    } catch(err){
        return res.sendStatus(401)
    }
}

controller.authSessionProfile = async(req,res) => {
    const {cookies} = req;
    console.log(cookies.sessionId)
    if(!cookies.sessionId) return res.sendStatus(401);
  
    const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
    console.log(userSession)

    if(!userSession) return res.sendStatus(401);

    const user = await userModel.findById(guid);
    if(!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);

}


export default controller