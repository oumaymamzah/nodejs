// Import the Mongoose library for interacting with MongoDB.
const mongoose = require('mongoose');
// Import the configuration file for MongoDB connection details.
const config = require('./config.js');
// Define a class named DBConfig to encapsulate the MongoDB configuration.
class DBConfig {
    // Constructor method for initializing the DBConfig class.
    constructor() {}
    // Method to connect to the MongoDB database using the provided connection URL and options.
    connect(){
        // Use Mongoose to connect to the MongoDB database using the URL and options specified in the configuration.
        mongoose.connect(config.DATABASE.URL, config.DATABASE.OPTIONS)
            .then(() => {
                // Log a success message if the connection is established successfully.
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                // Log an error message if there's an error while connecting to the MongoDB database.
                console.error('Error connecting to MongoDB:', error);
            });
    }
}
// Export the DBConfig class to make it accessible from other modules.
module.exports = DBConfig;