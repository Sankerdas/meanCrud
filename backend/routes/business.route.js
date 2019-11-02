const express = require('express');
const app = express();
const businessRoutes = express.Router();

let Business = require('../models/business');

// define add or store route save()
businessRoutes.route('/add').post(
    function(req, res) {
        let business = new Business(req.body);
        business.save().then(business => {
            res.status(200).json({'business' : 'business added successfully'})
        }).catch( err => {
            res.status(400).send('unable to save to database '+err)
        })
    }
);

// define get data (index or listing) route find()
businessRoutes.route('/').get(function(req, res) {
    Business.find(function(err, businesses){
        if(err){
            console.log(err)
        } else {
            res.json(businesses);
        }
    })
})

// edit: define get data for id wise editing
businessRoutes.route('/edit/:id').get(function(req,res){
    Business.findById(req.params.id, function(err,business){
        if(err){
            console.log('Error in edit '+err);
        } else {
            res.json(business);
        }
    });
});

businessRoutes.route('/update/:id').post(function(req,res){
    console.log(req.params.id);
});


module.exports = businessRoutes;