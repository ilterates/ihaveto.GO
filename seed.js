var db = require("./models");


var toiletList =[];

toiletList.push({
              Name: "Starbucks",
              StreetNo: "11",
              StreetName: "3rd",
              City: "San Francisco",
              State: "California",
              Zip: "94107",
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });
toiletList.push({
              Name: "Home",
              StreetNo: "900",
              StreetName: "Folsom",
              City: "San Francisco",
              State: "California",
              Zip:"94107",
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });
toiletList.push({
              Name: "General Assembly",
              StreetNo: "225",
              StreetName: "Bush",
              City: "San Francisco",
              State: "California",
              Zip: "94104",
              rating: [{
                rated: 5,
                comment: "greatest toilet"
              }]
            });
toiletList.push({
              Name: "McDonalds",
              StreetNo: "575",
              StreetName: "Market",
              City: "San Francisco",
              State: "California",
              Zip: "94105",
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
