var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ihavetogo");

module.exports.Toilet = require("./toilet.js");
