const User = require('../models/user.model');
const JwtMiddleware = require("../middlewares/jwt.middleware");
const bcrypt = require("bcryptjs");
const Generators = require('../utils/generators.utils');
const SenderMiddleware = require('../middlewares/sender.middleware');
const {Roles} = require("../utils/enum/roles.enum");

class AuthService {
    constructor() {
        this.jwtMiddleware = new JwtMiddleware()
        this.generators = new Generators();
        this.sender = new SenderMiddleware();
    }

    async register(req) {
        try {
            const data = req.body;
            const existingUser = await User.exists({email: data.email});
            if (existingUser) throw new Error(`${data.email} already exists!`);
            if(data.role && data.role == Roles.USER ) data.isActive = false;
            const savedUser = await new User(data).save()
           // await this.sender.sendMail('../../public/mails/AccountActivation.html', {code: savedUser.code}, data.email, "Account Activation");
            return savedUser;
        } catch (error) {
            throw new Error(`When creating new account: ${error.message}`);
        }
    }

    async login(req) {
        try {
            const data = req.body;
            const existingUser = await User.findOne({email: data.email});
            if (!existingUser) throw new Error(`${data.email} does not exist!`);
            const validPassword = bcrypt.compareSync(data.password, existingUser.password);
            if (!validPassword) throw new Error(`Invalid password [${data.password}]`);
            if (!existingUser.isActive) throw new Error(`Your account is not active!`);
            const user = { token:  this.jwtMiddleware.generateJWT(existingUser), user: existingUser};
return user
           
        } catch (error) {
            throw new Error(`When signing: ${error.message}`);
        }
    }

    async activate(req) {
        try {
            const data = req.body;
            const existingUser = await User.findOne({email: data.email});
            if (!existingUser) throw new Error(`${data.email} does not exist!`);
            if (existingUser.code !== data.code) throw new Error(`${data.code} is invalid!`);
            return await User.findOneAndUpdate({email: data.email}, {
                $set: {
                    isActive: true, code: this.generators.generateCode()
                }
            }, {returnOriginal: false});
        } catch (error) {
            throw new Error(`When activating account: ${error.message}`);
        }
    }
}

module.exports = AuthService;