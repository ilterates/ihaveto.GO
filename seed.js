var db = require("./models");


var toiletList =[];

toiletList.push({
              Name: "Starbucks",
              StreetNo: 122,
              StreetName: "3rd",
              City: "San Francisco",
              State: "California",
              Zip: 94107,
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });
toiletList.push({
              Name: "Target",
              StreetNo: 44,
              StreetName: "Jameson",
              City: "San Francisco",
              State: "California",
              Zip:94102,
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });
toiletList.push({
              Name: "General Assembly",
              StreetNo: 225,
              StreetName: "Bush",
              City: "San Francisco",
              State: "California",
              Zip: 92107,
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });
toiletList.push({
              Name: "McDonalds",
              StreetNo: 2332,
              StreetName: "Market",
              City: "San Francisco",
              State: "California",
              Zip: 94883,
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });

  db.Toilet.remove({}, function(err, toilets){

    db.Toilet.create(toiletList, function(err, toilets){
      if (err) { return console.log('ERROR', err); }
      console.log("all toilets:", toilets);
      console.log("created", toilets.length, "toilets");

      process.exit();

  });
});
