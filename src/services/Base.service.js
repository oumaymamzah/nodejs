// Importing the mongoose module for interacting with MongoDB
const mongoose = require('mongoose');
// Importing the MulterMiddleware module from '../middlewares/multer.middleware' for handling file uploads
const MulterMiddleware = require('../middlewares/multer.middleware');
// Importing the fs module for file system operations, with promises support
const { promises: fs } = require('fs');
// Importing the path module for working with file and directory paths
const path = require('path');
// Defining a class BaseService which will serve as a base service for interacting with MongoDB models
class BaseService {
    constructor(model) {
        // Initializing the BaseService with a model, which represents a MongoDB collection
        this.model = model;

        // Creating an instance of MulterMiddleware for handling file uploads
        this.multerMiddleware = new MulterMiddleware();
    }
    // Method to fetch all entities from the database
    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            // Handling errors that occur during the database operation
            throw new Error(`Error fetching entities: ${error.message}`);
        }
    }
    // Method to fetch an entity by its ID from the database
    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(`Error fetching entity by ID: ${error.message}`);
        }
    }
    async filter(data){
        try{
            return await this.model.find(data);
        } catch (error){
            throw new Error(`Error ${error.message} while fetching entity by ${data}`)
        }
    }
    // Method to create a new entity in the database
    async create(req, res) {
        try {
            const data = req.body;
            // If there are files attached to the request, upload and extract image filenames
            if (req.files && req.files.length > 0) {
                data.images = await this._uploadAndExtractImageFilenames(req, res);
            }
            // Create the entity with the provided data
            return await this.model.create(data);
        } catch (error) {
            throw new Error(`Error creating entity: ${error.message}`);
        }
    }
    // Method to update an existing entity in the database
    async update(req, res) {
        try {
            const data = req.body;
            // If there are files attached to the request, upload and extract image filenames
            if (req.files && req.files.length > 0) {
                const uploadedImages = await this._uploadAndExtractImageFilenames(req, res);
                // If new images are uploaded, delete existing images and update data
                if (uploadedImages.length > 0) {
                    await this._deleteExistingImages(req.params.id);
                    data.images = uploadedImages;
                }
            }
            // Find and update the entity with the provided ID and data
            return await this.model.findByIdAndUpdate(req.params.id, data, { new: true });
        } catch (error) {
            throw new Error(`Error updating entity: ${error.message}`);
        }
    }
    // Method to delete an entity from the database
    async delete(id) {
        try {
            // If the entity has associated images, delete them before deleting the entity
                await this._deleteAssociatedImages(id);
            // Delete the entity from the MongoDB collection by its ID
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting entity: ${error.message}`);
        }
    }
    // Method to delete associated images of an entity before deletion
    async _deleteAssociatedImages(id) {
        const entity = await this.getById(id);
        if (entity && entity.images && entity.images.length > 0) {
            // Delete each associated image before deleting the entity
            await Promise.all(entity.images.map(filename => this._deleteImage(filename)));
        }
    }
    // Method to upload images using the MulterMiddleware
    async _uploadImages(req, res) {
        return await this.multerMiddleware.uploadMultipleImages(req, res);
    }
    // Method to upload and extract image filenames from the request
    async _uploadAndExtractImageFilenames(req, res) {
        const uploadedImages = await this._uploadImages(req, res);
        return uploadedImages.map(file => file.filename);
    }
    // Method to delete existing images associated with an entity
    async _deleteExistingImages(id) {
        const existingEntity = await this.getById(id);
        if (existingEntity && existingEntity.images && existingEntity.images.length > 0) {
            // Delete each image associated with the entity
            await Promise.all(existingEntity.images.map(filename => this._deleteImage(filename)));
        }
    }
    // Method to delete an image from the file system
    async _deleteImage(filename) {
        // Constructing the path to the image file
        const imagePath = path.join(__dirname, '../../uploads', filename);
        // Deleting the image file from the file system
        await fs.unlink(imagePath);
        // Logging the successful deletion of the image
        console.log(`${filename} successfully deleted`);
    }
}
// Exporting the BaseService class to be used in other modules
module.exports = BaseService;