var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photo = new Schema({
    phototitle: String, 
    photo: {type: String},
    path:{type: String},
    userpics:[{
    paths: String,
    originalname: String
  }]
});

module.exports = mongoose.model('Photo', photo);