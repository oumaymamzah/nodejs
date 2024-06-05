const AuthService = require('../services/auth.service');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async _handleRequest(promise, res, status = 200) {
        try {
            // Await the resolution of the provided promise
            const result = await promise;
            // Send the result as JSON response with the provided status code
            res.status(status).json(result);
        } catch (error) {
            // If an error occurs, log the error and send a generic error message as JSON response
            console.error("Error occurred:", error);
            res.status(500).json({error: `Internal server error: ${error}`});
        }
    }

    Login = async (req, res) => {
        await this._handleRequest(this.authService.login(req), res);
    }
    Register = async (req, res) => {
        // Call handleRequest method to handle the promise returned by service's getAll method
        await this._handleRequest(this.authService.register(req), res, 201);
    }
    Activate = async (req, res) => {
        await this._handleRequest(this.authService.activate(req), res);
    }
}

module.exports = AuthController;