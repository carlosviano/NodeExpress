import express from 'express';
import { USERS_BBDD } from '../bbdd.js';
import checkEmailPassword from '../helpers/check_email_password.js'
import { SignJWT , jwtVerify} from 'jose';
import validateLoginDto from '../dto/validate_login_dto.js';

const authTokenRouter = express.Router();

authTokenRouter.post("/login",validateLoginDto, async (req,res)=>{

    const {email,password} = req.body;

    if(!email || !password) return res.sendStatus(400);

    try{
        const {guid} = checkEmailPassword(email,password);
        const jwtConstructor = new SignJWT({guid})
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
        .setProtectedHeader({alg:'HS256',typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_SECRET));

        console.log(jwt)

        return res.send({jwt});
    }catch(err){
        return res.sendStatus(401);
    }
});

authTokenRouter.get("/profile",async (req,res)=>{
const {authorization} = req.headers;

if(!authorization) return res.sendStatus(401);

try{
    const encoder = new TextEncoder();
    const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_SECRET));
    console.log(payload);
    const user = USERS_BBDD.find(user => user.guid === payload.guid);
    if(!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);

}catch(err){
    return res.sendStatus(401);
}
})



export default authTokenRouter;