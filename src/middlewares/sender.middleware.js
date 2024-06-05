// Import the nodemailer module to handle email sending.
const nodemailer = require('nodemailer');
// Import the promises API of the 'fs' module to handle file reading asynchronously.
const fs = require('fs').promises;
// Import the Handlebars library for template rendering.
const Handlebars = require('handlebars');
// Import the configuration file which contains the email sender configuration.
const config = require('../configs/config.js');
// Define a class named SenderMiddleware to encapsulate email sending functionality.
class SenderMiddleware {
    // Constructor method for initializing the SenderMiddleware class.
    constructor() {
        // Create a nodemailer transporter instance using the sender configuration from the config file.
        this.transporter = nodemailer.createTransport(config.SENDER);
    }
    // Asynchronous method to read the content of an HTML file from the specified path.
    async readHTMLFile(path) {
        try {
            // Use the promises API of the 'fs' module to read the file asynchronously and return its content.
            return await fs.readFile(path, { encoding: 'utf-8' });
        } catch (error) {
            // If an error occurs while reading the file, throw an error with a descriptive message.
            throw new Error(`Error while reading HTML file at ${path}: ${error.message}`);
        }
    }
    // Asynchronous method to send an email with HTML content.
    async sendMail(filePath, replacements, sendTo, subject) {
        try {
            // Read the content of the HTML file specified by the file path.
            const html = await this.readHTMLFile(filePath);
            // Compile the HTML template using Handlebars with the provided replacements.
            const template = Handlebars.compile(html);
            // Generate the HTML content with the applied replacements.
            const htmlToSend = template(replacements);
            // Define the mail options including sender, recipient, subject, and HTML content.
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: sendTo,
                subject: subject,
                html: htmlToSend
            };
            // Send the email using the configured transporter and provided mail options.
            const info = await this.transporter.sendMail(mailOptions);
            // Log a success message with the response information upon successful email sending.
            console.log('Mail successfully sent: ', info.response);
        } catch (error) {
            // If an error occurs during email sending, log an error message and re-throw the error.
            console.error(`Error while sending mail: ${error.message}`);
            throw error;
        }
    }
}
// Export the SenderMiddleware class to make it accessible from other modules.
module.exports = SenderMiddleware;