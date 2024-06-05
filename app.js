// Import the Express framework to create and configure the application.
const express = require("express");
const bodyParser = require('body-parser')
// Import the database configuration module.
const DBConfig = require('./src/configs/db.config');
// Import the CORS configuration module.
const CorsConfig = require('./src/configs/cors.config.js');
// Import the router middleware for handling routes.
const router = require("./src/routes/index.route");
// Import the root route constant from the routes enumeration file.
const { ROOT, UPLOAD } = require("./src/utils/enum/routes.enum.js");
// Create an instance of the Express application.
const app = express();
// Create an instance of the database configuration.
const dbConfig = new DBConfig();
// Create an instance of the CORS configuration.
const corsConfig = new CorsConfig();
// Connect to the database.
dbConfig.connect();
// Enable CORS by applying the CORS middleware to the application.
app.use(corsConfig.enableCORS());
// Middleware to parse incoming JSON requests.
app.use(express.json());
// Middleware to parse incoming URL-encoded requests.
app.use(express.urlencoded({ extended: true }));
// Configure Express app
//app.use(bodyParser.json());
// Mount the router middleware at the root URL ("/").
app.use(ROOT, router);
// Define a route handler for the root URL ("/").
// Responds with a JSON message "Hello World!" when accessed.
app.get(ROOT, (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});
// Serve static files from the 'uploads' directory when accessed via the UPLOAD route.
app.use(UPLOAD, express.static('uploads'));
// Export the Express application instance to be used elsewhere.
module.exports = app;