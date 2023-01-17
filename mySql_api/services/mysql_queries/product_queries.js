import db from "../mysql.js";
import moment from "moment/moment.js";

const productQueries = {};

productQueries.addImage = async (imageData) => {
    let conn = null;
    try {
        conn = await db.createConnection();

        let imageObj = {
            producto: imageData.name,
            path: imageData.path,
            reg_date: moment().format('YYYY-MM-DD HH:mm:ss'),
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

export default productQueries;