import {Type} from "@sinclair/typebox"
import Ajv from "ajv";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';


const LoginDTOSchema = Type.Object({
    email: Type.String({
        format:'email',
        errorMessage: {
            type:'El tipo de email debe ser un string',
            format:'Email debe contener un correo electronico valido'
        }
    }),
    password: Type.String({
        errorMessage:{
            type:'El tipo de password debe ser un string'
        }
    })
},{
    additionalProperties: false,
    errorMessage:{
        type:'Debe ser un objeto',
        additionalProperties:'El formato del objeto no es valido',
        required: {
            email:"El email es requerido",
            password:"La password es requerida"
        }
    }
})

const ajv = new Ajv({allErrors:true})
addFormats(ajv, ['email'])
addErrors(ajv, {keepErrors: false});

const validate = ajv.compile(LoginDTOSchema);

const validateLoginDto = (req,res,next)=>{
    const isDTOValid = validate(req.body)

if(!isDTOValid) return res.status(400).send(ajv.errorsText(validate.errors, {separator: '\n'}));

next();
};

export default validateLoginDto;

//ajv json validator    