var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ihavetogo");
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                      "mongodb://localhost/ihavetogo" );
module.exports.Toilet = require("./toilet.js");
module.exports.Rating = require("./rating.js");
