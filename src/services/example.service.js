// Importing the BaseService module from "./Base.service"
const BaseService = require("./Base.service");
// Importing the Example model from "../models/example.model"
const Example = require("../models/example.model");
// Defining a new class ExampleService which extends BaseService
class ExampleService extends BaseService {
    constructor() {
        // Calling the constructor of the parent class (BaseService) and passing the Example model
        super(Example);
    }
    // Defining a custom method called custom that takes in data as a parameter
    async custom(data){
        try {
            // Attempting to find entities in the Example model based on the provided data
            return await Example.find(data);
        } catch (error) {
            // Throwing an error if there's an issue fetching entities
            throw new Error(`Error fetching entity by ID: ${error.message}`);
        }
    }
}
// Exporting the ExampleService class to be used in other modules
module.exports = ExampleService;