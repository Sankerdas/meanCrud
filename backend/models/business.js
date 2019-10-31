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
    }
},{
    collation: 'business'
});

module.exports = mongoose.model('Business', Business);