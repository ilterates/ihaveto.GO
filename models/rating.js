var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var RatingSchema = new Schema ({

     rating: Number,
     comments: String

  });

var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
