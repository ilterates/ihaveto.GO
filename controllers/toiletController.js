var db = require('../models');


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
   Name: req.body.name,
   StreetNo: req.body.StreetNo,
   StreetName: req.body.StreetName,
   City: req.body.City,
   State: req.body.State,
   Zip: req.body.Zip,
   rating:[{
     rated: req.body.rating
   }]
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
  db.Toilet.findById(req.params.toiletId, function(err, foundToilet) {
      if (err)
      {
      console.log('Error:', err);
    } else {
      res.json(foundToilet);
    }
    });
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
