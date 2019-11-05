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

// update : define data updation
businessRoutes.route('/update/:id').post(function(req, res) {
    Business.findById(req.params.id, function(err, business) { // getting values by id
        if(!business) {
            console.log('Could not load Document');
        } else {
            // maping updated data
            business.prsn_name = req.body.prsn_name;
            business.bsns_name = req.body.bsns_name;
            business.bsns_gst_num = req.body.bsns_gst_num;

            business.save().then(business => { // saving to collection with matching id
                res.json('Update completed');
            }).catch(err => {
                res.status(400).send('Unable to update data');
            })
        }
    });
});

// delete : define delete record 
businessRoutes.route('/delete/:id').get(function(req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Record successfully Removed !');
    });
});


module.exports = businessRoutes;