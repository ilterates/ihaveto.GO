console.log("WE ARE ALIVE");

   var source = $('#toilets-template').html();
   var template = Handlebars.compile(source);
   var returned;
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
    returned = data;
    console.log(returned);
    console.log(data[0].rating[0].rated);
    var toiletResults = data;
    var toiletHtml = template({toilets:data});
    $(".list-group-item").append(toiletHtml);
  }

  $(".pure-button").click(function(){
     $(".map").toggle( "fade" );
     $(".formField").css("display", "block");
  });

$("#submitButton").click(function(e){
  e.preventDefault();
  // var $name = $("name").val(),
  //     $streetName = $("StreetName").val(),
  //     $streetNo = $("StreetNo").val(),
  //     $Zip = $("Zip").val(),
  //     $rating = $("rating").val(),
  //     $City = $("City").val(),
  //     $State = $("State").val();
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
function initMap() {
  var geocoder;
  var map = new google.maps.Map(document.getElementById('mapid'), {
    zoom: 12,
    center: {lat: 37.774, lng: -122.431}
  });
  geocoder = new google.maps.Geocoder();
  document.getElementById('testbutton').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = (returned[0].StreetNo + " " + returned[0].StreetName + " Street " + "San Francisco "+ returned[0].Zip);
  geocoder.geocode({'address': address}, function(results, status) {
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


// Leaflet map
// var mymap = L.map('mapid').setView([37.774, -122.431], 13);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'ilterates.pk6md0o7',
//     accessToken: 'pk.eyJ1IjoiaWx0ZXJhdGVzIiwiYSI6ImNpbXFsYmE1bTAwbDd3a2x1OTNidmtuMDUifQ.p0ZHX4q7HRq_ze-NHyrT4Q'
// }).addTo(mymap);
