// Import the built-in 'http' module, which provides functionality for creating HTTP servers.
const http = require("http");
// Import the 'SERVER' constant from the 'config.js' file located in the 'configs' directory.
const { SERVER } = require('./src/configs/config.js');
// Import the 'app' module, which contains the configuration and routes for the server.
const app = require('./app');
// Create an HTTP server instance using the 'http.createServer()' method.
// The 'createServer()' method takes the 'app' module as an argument, which represents the server's request handling logic.
const server = http.createServer(app);
// Start the HTTP server to listen for incoming requests on the port specified in the 'SERVER.PORT' constant.
// The 'listen()' method takes the port number and a callback function as arguments.
// The callback function is executed once the server starts listening, and it logs a message indicating that the server is running on the specified port.
server.listen(SERVER.PORT, () => {
    console.log(`Server is running on port: ${SERVER.PORT}`);
});
