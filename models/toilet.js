var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  var Rating = require('./rating.js');

  var ToiletSchema = new Schema ({

     Name: String,
     StreetNo: Number,
     StreetName: String,
     City: String,
	   State: String,
	   Zip:Number,
     rating: [Rating.schema]

  });

var Toilet = mongoose.model('Toilet', ToiletSchema);

module.exports = Toilet;
