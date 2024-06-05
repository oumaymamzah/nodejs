const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const config = require('../configs/config.js');
const { Roles } = require("../utils/enum/roles.enum");
const Generators = require("../utils/generators.utils");
const generators = new Generators();
// Define a Mongoose schema for the "user" entity
const userSchema = new mongoose.Schema({
    // Specific fields for user entity
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                // Regex to match at least one special character, one number, one capital letter, and a minimum length of 8 characters
                return /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Z]).{8,}$/.test(password);
            },
            message: props => `Password must contain at least one special character, one number, one capital letter, and be at least 8 characters long!`
        }
    },
    code: {
        type: String,
        default: generators.generateCode
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.ADMIN
    },
    isActive :{
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define toJSON option to remove password field from JSON representation of object
userSchema.options.toJSON = {
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.code;
    }
};

// Define pre-save hook to hash password before saving
userSchema.pre("save", async function(next) {
    if (this.password && this.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(parseInt(config.ENCRYPTION.SALT));
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Create a Mongoose model named "User" based on the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model to make it accessible from other modules
module.exports = User;
