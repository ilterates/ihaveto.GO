console.log("WE ARE ALIVE");

   var source = $('#toilets-template').html();
   var template = Handlebars.compile(source);
   var value;
   var zoomVal =12;
$.ajax ({
  method: "GET",
  url: "/api/toilets",
  dataType: 'json',
  success: renderToilets,
  error: ajaxError
});

function ajaxError(data){
  console.log("ajax handling error" +  data);
}

function renderToilets(data) {
    console.log(data, "this is data");
    var toiletResults = data;
    var toiletHtml = template({toilets:data});
    $(".list-group-item").append(toiletHtml);


    toiletResults.forEach(function(z){
      var val = z.StreetNo + " " + z.StreetName + " street " + z.City + " " + z.Zip;
      //var $button = $("<button>", {value: val, class: 'goButton', text: z.Name, id: 'buttonGO'});
    //  $(".holySpan").append($button);
      console.log(z.StreetNo + " " + z.StreetName + " street" + z.City + " " + z.Zip);
    });
}


  $(".pure-button").click(function(){
     $(".map").toggle( "fade" );
     $(".formField").css("display", "block");
  });



$("#submitButton").click(function(e){
  e.preventDefault();

  $.ajax ({
    method: "POST",
    url: "/api/toilets",
    data: $(".form").serialize(),
    success: postSuccess,
    error: postError

  });

});

function postSuccess (data){
  console.log(data + "Posted");
}
function postError (data){
  console.log(data + "Error in ajax post");
}

// Google Maps

var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  icon: iconBase + 'http://i.imgur.com/KYvAGUW.png'
});

function initMap() {
  var geocoder;
  var map = new google.maps.Map(document.getElementById('mapid'), {
    zoom: zoomVal,
    center: {lat: 37.774, lng: -122.431}
  });
  geocoder = new google.maps.Geocoder();
  $('.pure-button').click(function(e) {
    geocodeAddress(geocoder, map);
    value = e.target.value;
    console.log(value);
  //  zoomVal = 15; I hoped to change zoom value on click

  });
}

function geocodeAddress(geocoder, resultsMap) {
console.log(value);
  var address = value;
  // console.log($("#buttonGO").val());
  console.log(address, "is the address");
  geocoder.geocode({'address': address}, function(results, status) {
    console.log(results[0].geometry.location);
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
