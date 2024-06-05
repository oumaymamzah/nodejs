// Importing the express module
const express = require('express');
// Creating a router instance using express.Router()
const router = express.Router();
// Importing the ExampleRoutes module from './example.route'
const ExampleRoutes = require('./example.route');
const OfferRoute = require('./offer.route');
const DescriptionRoute = require('./description.route');
const FormulaireRoute = require('./formulaire.route');
const AuthRoutes = require('./auth.route');
// Importing the MODELS enum from the '../utils/enum/routes.enum' file
const { MODELS } = require("../utils/enum/routes.enum");
// Creating an instance of ExampleRoutes
const exampleRoutes = new ExampleRoutes();
const offerRoutes = new OfferRoute();
const descriptionRoutes = new DescriptionRoute();
const formulaireRoutes = new FormulaireRoute();
const authRoutes = new AuthRoutes();
// Mounting the exampleRoutes router under the path specified by MODELS.EXAMPLE
router.use(MODELS.EXAMPLE, exampleRoutes.getRouter());
router.use(MODELS.OFFER, offerRoutes.getRouter());
router.use(MODELS.DESCRIPTION, descriptionRoutes.getRouter());
router.use(MODELS.FORMULAIRE, formulaireRoutes.getRouter());
router.use(MODELS.AUTH, authRoutes.getRouter())
// Exporting the router to be used in other modules
module.exports = router;