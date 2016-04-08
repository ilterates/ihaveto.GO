var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var RatingSchema = new Schema ({

     rated: Number,
     comment: String

  });

var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
