const mongoose = require('mongoose');
// Define a Mongoose schema for the "example" entity
const offerSchema = new mongoose.Schema({
    // Specific fields for example entity
   // _id : mongoose.Schema.Types.ObjectId,
    titre: {
        type: String
    },
    description: String,
    prix: {
        type: Number
    },
    dateDebut :{ type:Date },
    dateFin :{ type:Date },
    images: { type: String },
    // You can add more fields specific to products here
});
// Create a Mongoose model named "Example" based on the defined schema
const offer = mongoose.model('offer', offerSchema);
// Export the Example model to make it accessible from other modules
module.exports = offer;