
//---->  REST api
const express = require('express');
const app = express();
const businessRoutes = express.Router();
const multer = require('multer');

let Business = require('../models/business');

businessRoutes.post('/add', function(req, res, next) {
    let business = new Business(req.body);
    business.save().then(business =>{
        res.status(200).json({'business': 'Business added successfully'}).catch(err => {
            res.status(400).send('unable to save data to databse ' + err);
        })
    })
});



// define get data route (index or listing)
businessRoutes.route('/').get(function(req, res) {
    Business.find(function(err, businesses){
        if(err){
            console.log(err)
        } else {
            res.json(businesses);
        }
    })
})

// Search: define search and get data from prsn_name
businessRoutes.route('/search/:qry').get(function(req,res){
    Business.find( { prsn_name: { $regex: req.params.qry, $options: "i" } }, function(err, businesses){
        if(err){
            console.log(err)
        } else {
            res.json(businesses);
        }
    })
});
// { $text: { $search: "java coffee shop" } } -- to serach form entire collection -- need to see it showing some error



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


// Multer File upload settings
// const DIR = './public/';

// const multerConfig = {
//     storage: multer.diskStorage({
//         destination: function(req, file, next){
//             next(null, DIR);
//         },
//         filename: function(req, file, next) {
//             console.log(file);
//         }
//     })
// }

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//     }
//   });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       console.log(file)
//       cb(null, fileName)
//     }
//   });



//  // define add or store route save()
// businessRoutes.route('/add').post(
//     function(req, res) {
//         let business = new Business(req.body);
//         business.save().then(business => {
//             res.status(200).json({'business' : 'business added successfully'})
//         }).catch( err => {
//             res.status(400).send('unable to save to database '+err)
//         })
//     }
// );


// businessRoutes.post('/add', upload.single('bsns_logo'), function(req, res, next) {
//     let business = new Business(req.body);
//     business.save().then(business =>{
//         var path = '';
//         upload(req, res, function (err) {
//            if (err) {
//              // An error occurred when uploading
//              console.log(err);
//              return res.status(422).send("an Error occured")
//            }
//           // No error occured.
//            path = req.file.path;
//            return res.send("Upload Completed for "+path);
//      });
//         res.status(200).json({'business': 'Business added successfully'}).catch(err => {
//             res.status(400).send('unable to save data to databse ' + err);
//         })
//     })
// });


// router.post('/', function (req, res, next) {
//     var path = '';
//     upload(req, res, function (err) {
//        if (err) {
//          // An error occurred when uploading
//          console.log(err);
//          return res.status(422).send("an Error occured")
//        }
//       // No error occured.
//        path = req.file.path;
//        return res.send("Upload Completed for "+path);
//  });
// })




module.exports = businessRoutes;
