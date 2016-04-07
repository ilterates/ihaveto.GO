var db = require('../models');

/************
 * DATABASE *
 ************/


// GET /api/albums
function index(req, res) {
  db.Toilet.find(function (err, album){
    if (!err) {
        res.json(album);
      } else {
        console.log("Can not get api/toilet db" + err);
      }
  });
}

function create(req, res) {
  console.log(req.body);
 var newToilet = new db.Toilet ({
   Name: String, //
   StreetNo: Number, //
   StreetName: String, //
   City: String, //
   State: String, //
   Zip:Number, //
   rating: String //
 });
 newToilet.save(function (err, toilet){
   if (err) {
     return console.log("save error: " + err);
   }
   console.log("saved", toilet.name);
   res.json(toilet);

 });
}

function show(req, res) {
//findOne
}

function destroy(req, res) {
  // delete
}

function update(req, res) {
  // put
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
