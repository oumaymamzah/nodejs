class CorsConfig {
    constructor() {
        // Default allowed origins for CORS
        this.origin = ['*'];
        // Default allowed HTTP methods for CORS
        this.methods = ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'];
    }
    // Method to enable CORS (Cross-Origin Resource Sharing)
    enableCORS() {
        // Return a middleware function to handle CORS headers
        return function(req, res, next) {
            // Get the request origin from the request headers
            const requestOrigin = req.headers.origin;
            // Set the Access-Control-Allow-Origin header based on the request origin
            res.setHeader('Access-Control-Allow-Origin', this.origin.includes(requestOrigin) ? requestOrigin : this.origin);
            // Set the Access-Control-Allow-Methods header
            res.setHeader('Access-Control-Allow-Methods', this.methods.join(', '));
            // Set the Access-Control-Allow-Headers header
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            // Set the Access-Control-Allow-Credentials header to allow credentials in cross-origin requests
            res.setHeader('Access-Control-Allow-Credentials', true);
            // Handle preflight OPTIONS requests by sending a 200 OK response
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                // Call the next middleware function in the stack
                next();
            }
        }.bind(this); // Bind 'this' context to the middleware function
    }
}
// Export the CorsConfig class to make it accessible from other modules
module.exports = CorsConfig;