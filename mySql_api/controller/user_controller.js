import dao from "../services/dao.js";


const controller = {};


controller.addUser = async (req, res) => {
    const {name,email,password} = req.body;

    if(!name ||!email || !password) return res.status(400).send("Error al recibir el body")

    try{
        const user = await dao.getUser(email)

        if(user.length > 0) return res.status(409).send("usuario ya registrado");
        
        const addUser = await dao.addUser(req.body)
        if(addUser) return res.send(`Usuario ${name} con id: ${addUser} registrado`)
    } catch(e){
        console.log(e.message)
    }

}

export default controller