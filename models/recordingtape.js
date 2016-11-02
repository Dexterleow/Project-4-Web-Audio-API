var mongoose = require('mongoose');

//Recordingtape Schema
var RecordingtapeSchema = new mongoose.Schema({
  username: {
    type: String
  },
  recording: {
    type: Array
  }

 });

//Creating a model
var Recordingtape = module.exports = mongoose.model('Recordingtape', RecordingtapeSchema);
