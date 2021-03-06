var db = require('../models');


function index(req, res) {
  db.Toilet.find({},function (err, album){
    if (!err) {
        res.json(album);
      } else {
        console.log("Can not get api/toilet db" + err);
      }
  });
}

function create(req, res) {
  var rating = req.body.rating;
  if (rating > 5) {
    rating = 5;
  } else if ( rating  < 1){
    rating = 1;
  }
  console.log(req.body);
 var newToilet = new db.Toilet ({
   Name: req.body.name,
   StreetNo: req.body.StreetNo,
   StreetName: req.body.StreetName,
   City: req.body.City,
   State: req.body.State,
   Zip: req.body.Zip,
   rating:[{
     rated: rating
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
      if (err) {
      console.log('Show Error:', err);
    } else {
      res.json(foundToilet);
    }
    });
}

function destroy(req, res) {
  db.Toilet.findOneAndRemove({ _id: req.params.toiletId }, function(err, found){
    console.log('toilet found:', found);
    res.json(found);
    console.log('successfully removed. id:', req.params.toiletId);
  });
}

function update(req, res) {
  var rating = req.body.rating;
  if (rating > 5) {
    rating = 5;
  } else if ( rating  < 1){
    rating = 1;
  }
  db.Toilet.findById(req.params.toiletId, function(err, foundToilet) {
    if(err) { console.log('toiletController.update error', err); }
    foundToilet.Name = req.body.name;
    foundToilet.StreetNo = req.body.StreetNo;
    foundToilet.StreetName = req.body.StreetName;
    foundToilet.City = req.body.City;
    foundToilet.State = req.body.State;
    foundToilet.Zip = req.body.Zip;
    foundToilet.rating = [{ rated: rating}];
    foundToilet.save(function(err, savedToilet) {
      if(err) { console.log('saving altered toilet failed'); }
      res.json(savedToilet);
    });

 });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
