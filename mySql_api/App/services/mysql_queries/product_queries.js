import db from "../mysql.js";
import moment from "moment/moment.js";

const productQueries = {};

productQueries.addImage = async (imageData) => {
    let conn = null;
    try {
        conn = await db.createConnection();

        let imageObj = {
            name: imageData.name,
            path: imageData.path,
            reg_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            producto: imageData.producto
        }
        return await db.query('INSERT INTO imagen SET ? ', imageObj,'insert', conn);
    } catch (e){
        throw new Error(e);
    } finally {
        conn && (await conn.end())
    }
};

productQueries.getImageById = async (id) => {
    let conn = null;
    console.log(id);
    try{
        conn = await db.createConnection();
        return await db.query('SELECT * FROM imagen WHERE id = ?',id,"select",conn);
    } catch(e){
        throw new Error(e);
    } finally {
        conn && (await conn.end());
    }
}

productQueries.getProductByRef = async (ref) => {
    let conn = null;
    console.log(ref);
    try {
        conn = await db.createConnection();
        return await db.query('SELECT * FROM producto where referencia = ?', ref,"select",conn)
    } catch (e){
        throw new Error(e);
    } finally {
        conn && (await conn.end());
    }
}

productQueries.addProduct = async (productData) => { 
    let conn = null;

    try{ 
        conn = await db.createConnection();

        let productObj = {
            nombre: productData.nombre, 
            precio: productData.precio, 
            referencia: productData.referencia,
            talla: productData.talla,
        }
        return await db.query('INSERT INTO producto SET ? ',productObj,'insert',conn);
    } catch(e){
        throw new Error(e)
    } finally {
        conn && (await conn.end())
    }
    
}

productQueries.getAllProducts = async (nulo) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        return await db.query('SELECT * FROM producto WHERE nombre != ? ',nulo,"select",conn)
    } catch (e){
        throw new Error(e);
    } finally {
        conn && (await conn.end())
    }
}

export default productQueries;