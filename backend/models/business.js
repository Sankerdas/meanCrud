const mongoose = require('mongoose');
const schema = mongoose.Schema;

// define collection and schema for businness
let Business = new schema({
    prsn_name:{
        type: String
    },
    bsns_name:{
        type: String
    },
    bsns_gst_num:{
        type: String
    },
    bsns_logo:{
        type: Array
    }
},{
    collation: 'business'
});

module.exports = mongoose.model('Business', Business); // business schema exporting