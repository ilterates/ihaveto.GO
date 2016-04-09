var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  var Rating = require('./rating.js');

  var ToiletSchema = new Schema ({

     Name: String,
     StreetNo: String,
     StreetName: String,
     City: String,
	   State: String,
	   Zip:String,
     rating: [Rating.schema]

  });

var Toilet = mongoose.model('Toilet', ToiletSchema);

module.exports = Toilet;
