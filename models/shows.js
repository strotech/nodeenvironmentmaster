const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var db =  mongoose.connection;
delete db.models['showsDetailsModel'];
const showsDetailsSchema = new Schema({
    "title": String,
    "version": String,
    "showDetails":[{
        "name":String,
        "genre": String,
        "lead_actor": String
    }]
},{ collection : 'shows_details' });
module.exports = mongoose.model('showsDetailsModel', showsDetailsSchema );