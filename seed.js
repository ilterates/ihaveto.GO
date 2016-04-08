var db = require("./models");


var toiletList =[];
var ratingList = [];
toiletList.push({
              Name: "Starbucks",
              StreetNo: 122,
              StreetName: "3rd",
              City: "San Francisco",
              State: "California",
              Zip: 94107,
            });
toiletList.push({
              Name: "Target",
              StreetNo: 44,
              StreetName: "Jameson",
              City: "San Francisco",
              State: "California",
              Zip:94102,
            });
toiletList.push({
              Name: "General Assembly",
              StreetNo: 225,
              StreetName: "Bush",
              City: "San Francisco",
              State: "California",
              Zip: 92107,
            });
toiletList.push({
              Name: "McDonalds",
              StreetNo: 2332,
              StreetName: "Market",
              City: "San Francisco",
              State: "California",
              Zip: 94883,
            });
ratingList.push({
      rating: 5,
      comment: "greatest toilet"
});
ratingList.push({
      rating: 3,
      comment: "it smells"
});
ratingList.push({
      rating: 1,
      comment: "YAK"
});
ratingList.push({
      rating: 4,
      comment: "I feel good"
});


toiletList.forEach(function(toilet) {
  toilet.rating = ratingList;
  console.log(toiletList);
});


db.Toilet.remove({}, function(err, toilets){

  db.Toilet.create(toiletList, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    console.log("all toilets:", toilets);
    console.log("created", toilets.length, "toilets");
    process.exit();
  });

});
