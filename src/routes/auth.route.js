const AuthController = require('../controllers/auth.controller');
const routes = require("../utils/enum/routes.enum");
const express = require("express");
class AuthRoutes {
    constructor() {
        this.authController = new AuthController();
        this.router = express.Router();
        this.setupRoutes().catch(error => {
            console.error('Error setting up routes:', error);
        });
    }
    async setupRoutes() {
        const loginHandler = this.authController.Login.bind(this.authController);
        const registerHandler = this.authController.Register.bind(this.authController);
        const activateHandler = this.authController.Activate.bind(this.authController);

        this.router.post(routes.AUTH.LOGIN, loginHandler);
        this.router.post(routes.AUTH.REGISTER, registerHandler);
        this.router.post(routes.AUTH.ACTIVATE, activateHandler);

        return this.router;
    }
    getRouter() {
        return this.router;
    }
}
module.exports = AuthRoutes;