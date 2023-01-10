import express  from "express";
import accountController from '../controllers/account_controller.js';
import authController from '../controllers/auth_controller.js';
import authSessionController from '../controllers/auth_session_controller.js'
import authTokenController from '../controllers/auth_token_controller.js'
import validateLoginDto from "../dto/validate_login_dto.js";
import userController from '../controllers/user_controller.js';

const router = express.Router();

// rutas account
router.get("/account/:guid", accountController.listUser)
router.post('/account', accountController.addUser)
router.patch('/account/:guid', accountController.updateUser)
router.delete('/account/:guid',accountController.deleteUser)
//rutas auth
router.get("/auth/public", authController.authPublic)
router.post("/auth/autenticado",authController.authAuthenticated)
router.post("/auth/autorizado", authController.authAuthorizated)
//rutas auth session
router.post('/auth-session/login',authSessionController.authSessionLogin)
router.get('auth-session/profile', authSessionController.authSessionProfile)
//rutas  auth token
router.post('/auth-token/login', validateLoginDto , authTokenController.authTokenLogin)
router.get('/auth-token/profile', authTokenController.authTokenProfile)
// rutas user
router.get('/user/:guid', userController.userList)
router.patch('/user/account/:guid', userController.userUpdate)
export default router;

