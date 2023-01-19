import db from "../mysql.js ";
import moment from "moment/moment.js";
import md5 from "md5";
import utils from "../../utils/utils.js";

const userQueries = {};

userQueries.getUserByEmail = async (email) => {
    let conn = null
    try{
        conn = await db.createConnection();
        return await db.query('SELECT * FROM usuario WHERE email = ?', email, 'select',conn)
    } catch(e){
        throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.addUser = async (userData) => {
    let conn = null;
    try{
        conn = await db.createConnection();

        let userObj = {
            nombre: userData.name, 
            apellidos: userData.surname,
            email: userData.email,
            password: md5(userData.password),
            reg_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        return await db.query('INSERT INTO usuario SET ?',userObj, 'insert',conn)
    } catch(e){
        throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.getUserById = async (id) => {
    let conn = null
    try{
        conn = await db.createConnection();
        return await db.query('SELECT * FROM usuario WHERE id = ?', id, 'select',conn)
    } catch(e){
        throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.deleteUser = async (id) => {
    let conn = null
    try{
        conn = await db.createConnection();
        return await db.query('DELETE FROM usuario WHERE id = ?', id, 'delete',conn)
    } catch(e){
        throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.updateUser = async (id,userData) => {
    let conn = null
    try{
        conn =  await db.createConnection();

        let userObj = {
            nombre: userData.name,
            apellidos: userData.surname,
            email: userData.email,
            password: userData.password ? md5(userData.password) : undefined,
            update_date: moment().format("YYYY-MM-DD HH:mm:ss") 
        }
        userObj = await utils.removeUndefinedKeys(userObj)
        return await db.query('Update usuario SET ? WHERE id = ?', [userObj,id], 'update', conn)
    } catch (e){
        throw new Error(e);
    } finally {
        conn && await conn.end();
    }
}


export default userQueries