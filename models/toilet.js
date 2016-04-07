var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var ToiletSchema = new Schema ({

     Name: String,
     StreetNo: Number,
     StreetName: String,
     City: String,
	   State: String,
	   Zip:Number,
     rating: String

  });

var Toilet = mongoose.model('Toilet', ToiletSchema);

module.exports = Toilet;
