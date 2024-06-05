// Importing the Express framework for creating routers.
const express = require('express');
// Importing the route enumeration containing route paths.
const routes = require('../utils/enum/routes.enum');
// Importing the MulterMiddleware class for configuring Multer middleware.
const MulterMiddleware = require('../middlewares/multer.middleware');
// Define a class named BaseRoute for creating API route handlers.
class BaseRoute {
    // Constructor method for initializing BaseRoute instances.
    constructor(controller) {
        // Initialize an Express router instance.
        this.router = express.Router();
        // Initializing a MulterMiddleware instance for handling file uploads.
        this.multerMiddleware = new MulterMiddleware();
        // Store the controller object responsible for handling route logic.
        this.controller = controller;
        // Asynchronously set up routes for the controller methods.
        // Catch any errors that occur during route setup and log them.
        this.setupRoutes().catch(error => {
            console.error('Error setting up routes:', error);
        });
    }
    // Asynchronous method to set up routes for the controller methods.
    async setupRoutes() {
        // Bind controller methods to corresponding route handlers.
        // GET route for fetching all resources handled by the controller.
        const getAllHandler = this.controller.GetAll.bind(this.controller);
        this.router.get(routes.GET_ALL, getAllHandler);
        // GET route for fetching a specific resource by ID.
        const getByIdHandler = this.controller.GetById.bind(this.controller);
        this.router.get(routes.GET, getByIdHandler);
        const filterHandler = this.controller.Filter.bind(this.controller);
        this.router.get(routes.FILTER, filterHandler);
        // POST route for creating a new resource.
        const createHandler = this.controller.Create.bind(this.controller);
        // Utilizing Multer middleware for handling file uploads before calling the createHandler.
        this.router.post(routes.CREATE, this.multerMiddleware.upload, createHandler);
        // PUT route for updating an existing resource.
        const updateHandler = this.controller.Update.bind(this.controller);
        // Utilizing Multer middleware for handling file uploads before calling the updateHandler.
        this.router.patch(routes.UPDATE, this.multerMiddleware.upload, updateHandler);
        // DELETE route for deleting a resource by ID.
        const deleteHandler = this.controller.Delete.bind(this.controller);
        this.router.delete(routes.DELETE, deleteHandler);
        // Return the configured router instance.
        return this.router;
    }
    // Method to retrieve the configured router instance.
    getRouter() {
        return this.router;
    }
}
// Export the BaseRoute class for use in other modules.
module.exports = BaseRoute;