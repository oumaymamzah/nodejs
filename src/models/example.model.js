const mongoose = require('mongoose');
// Define a Mongoose schema for the "example" entity
const exampleSchema = new mongoose.Schema({
    // Specific fields for example entity
    nom: {
        type: String
    },
    description: String,
    prix: {
        type: Number
    },
    prénom :{
        type: String
    },
    contact :{
        type: Number
    },
    email: [{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }],
    sujetMessage: {
        type: String
    },
    message : {
        type: String},
    dateEnvoi: {
        type: Date
    },
    
    images: [{ type: String }],
    // You can add more fields specific to products here
});
// Create a Mongoose model named "Example" based on the defined schema
const Example = mongoose.model('Example', exampleSchema);
// Export the Example model to make it accessible from other modules
module.exports = Example;