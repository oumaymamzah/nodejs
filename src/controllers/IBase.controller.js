// Define a class named IBaseController
class IBaseController {
    // Constructor takes a service instance as parameter
    constructor(service) {
        // Assign the service instance to the property 'service'
        this.service = service;
        // Check if an instance of the abstract class IBaseController is being created directly
        if (this.constructor === IBaseController) {
            // If so, throw an error indicating that IBaseController is an abstract class
            throw new Error(`${IBaseController.name} is an abstract class cannot be instantiated directly`);
        }
    }
    // Method to handle asynchronous requests
    async _handleRequest(promise, res, status=200) {
        try {
            // Await the resolution of the provided promise
            const result = await promise;
            // Send the result as JSON response with the provided status code
            res.status(status).json(result);
        } catch (error) {
            // If an error occurs, log the error and send a generic error message as JSON response
            console.error("Error occurred:", error);
            res.status(500).json({ error: `Internal server error: ${error}` });
        }
    }
    // Method to handle HTTP GET request to retrieve all resources
    GetAll = async (req, res) => {
        // Call handleRequest method to handle the promise returned by service's getAll method
        await this._handleRequest(this.service.getAll(), res);
    }
    // Method to handle HTTP GET request to retrieve a single resource by its ID
    GetById = async (req, res) => {
        // Call handleRequest method to handle the promise returned by service's getById method
        await this._handleRequest(this.service.getById(req.params.id), res);
    }
    Filter = async (req, res)=>{
        await this._handleRequest(this.service.filter(req.body), res);
    }
    // Method to handle HTTP POST request to create a new resource
    Create = async (req, res) => {
        // Call handleRequest method to handle the promise returned by service's create method
        // Pass true as the third argument to indicate that the resource was successfully created (HTTP status 201)
        await this._handleRequest(this.service.create(req, res), res, 201);
    }
    // Method to handle HTTP PUT request to update an existing resource
    Update = async (req, res) => {
        // Call handleRequest method to handle the promise returned by service's update method
        // Pass true as the third argument to indicate that the resource was successfully updated (HTTP status 201)
        await this._handleRequest(this.service.update(req, res), res, 201);
    }
    // Method to handle HTTP DELETE request to delete a resource by its ID
    Delete = async (req, res) => {
        // Call handleRequest method to handle the promise returned by service's delete method
        await this._handleRequest(this.service.delete(req.params.id), res);
    }
}
// Export the IBaseController class to make it available for use in other modules
module.exports = IBaseController;
