const mongoose = require('mongoose');
// Define a Mongoose schema for the "example" entity
const formulaireSchema = new mongoose.Schema({
    // Specific fields for example entity
    //_id : mongoose.Schema.Types.ObjectId,
    //_idVisiteur : mongoose.Schema.Types.ObjectId,
    nom: {
        type: String
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
    
    // You can add more fields specific to products here
});
// Create a Mongoose model named "Example" based on the defined schema
const formulaire = mongoose.model('formulaire', formulaireSchema);
// Export the Example model to make it accessible from other modules
module.exports = formulaire;