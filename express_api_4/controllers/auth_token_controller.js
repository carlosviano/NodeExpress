import { SignJWT } from "jose";
import { USERS_BBDD } from "../bbdd.js";
import checkEmailPassword from "../helpers/check_email_password.js";

const controller = {};

controller.authTokenLogin = async(req,res) => {
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
}

controller.authTokenProfile = async (req,res) => {
    const {authorization} = req.headers; //si el token viniera por bearer y no por header se pondria .authorization.split(" ")[1]

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

}

export default controller;