const jwt = require('jsonwebtoken');
const config = require('../configs/config');
class JwtMiddleware{
    constructor() {
    }
     generateJWT(user) {
        return jwt.sign({ id: user._id, role: user.role, }, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRATION });
    };
}
module.exports = JwtMiddleware;