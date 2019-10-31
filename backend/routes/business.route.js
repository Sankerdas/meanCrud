const express = require('express');
const app = express();
const businessRoutes = express.Router();

let Business = require('../models/business');

businessRoutes.route('/add').post(
    function(req, res) {
        let business = new Business(req.body);
        business.save().then(business => {
            res.status(200).json({'business' : 'business added successfully'})
        }).catch( err => {
            res.status(400).send('unable to save to database '+err)
        })
    }
)

module.exports = businessRoutes;