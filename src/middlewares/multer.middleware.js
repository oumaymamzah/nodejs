// Importing multer module
const multer = require('multer');
// Defining a class called FileUploader
class MulterMiddleware {
    constructor() {
        // Initializing a storage engine for multer
        this.storage = multer.diskStorage({
            // Setting the destination directory for uploaded files
            destination: function (req, file, cb) {
                cb(null, './uploads'); // Temporary storage for files
            },
            // Setting the filename of the uploaded file
            filename: function (req, file, cb) {
                cb(null, Date.now()+"-"+file.originalname);
            }
        });
        // Creating an instance of multer with the defined storage engine
        this.upload = multer({ storage: this.storage }).array("images", 5);
    }
    // Method to handle uploading of multiple images
    uploadMultipleImages = (req, res) => {
        return req.files; // Return uploaded files
    };
}
// Exporting the MulterMiddleware class to be used in other files
module.exports = MulterMiddleware;
