// Importing the ExampleService module from the '../services/example.service' file
const DescriptionService = require('../services/description.service');
// Importing the Example model from the "../models/example.model" file
const description = require("../models/description.model");
// Importing the IBaseController module from the "./IBase.controller" file
const IBaseController = require("./IBase.controller");
// Defining a new class ExampleController which extends IBaseController
class DescriptionController extends IBaseController {
    constructor() {
        // Calling the constructor of the parent class (IBaseController) and passing an instance of ExampleService initialized with Example model
        super(new DescriptionService(description));
        // Initializing an instance of ExampleService with Example model and assigning it to the property exampleService of the ExampleController class
        this.descriptionService = new DescriptionService(description);
    }
    // Defining a custom method called Custom that takes in request (req) and response (res) objects
    /*Custom = async (req, res) => {
        // Await and handle the promise returned by the service's custom method, passing the request body as a parameter.
        await this.handleRequest(this.exampleService.custom(req.body), res);
    }*/
}
// Exporting the ExampleController class to be used in other modules
module.exports = DescriptionController;