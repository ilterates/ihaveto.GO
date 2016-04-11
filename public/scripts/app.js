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
    toiletHtml = template({toilets:toiletResults});
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
     $(".fixedMap").toggle( "fade" );
     $(".formField").css("display", "block");
  });



$("#submitButton").click(function(data){
  data.preventDefault();

  $.ajax ({
    method: "POST",
    url: "/api/toilets",
    data: $("#form").serialize(),
    success: addToilet,
    error: postError

  });

});

function addToilet (newToilet){
  console.log(toiletHtml);
  $(".list-group-item").append(toiletHtml);
  $(".formField").css("display", "none");
}

function postError (data){
  console.log(data + "Error in ajax post");
}

// Google Maps

function initMap() {
  var geocoder;
  var map = new google.maps.Map(document.getElementById('mapid'), {
    zoom: zoomVal,
    center: {lat: 37.774, lng: -122.431},
    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},
    {"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},
    {"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},
    {"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},
    {"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
    {"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},
    {"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},
    {"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
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
console.log(value); // strangely code wasn't working until I console logged value here. Before this, address was undefined.. ??
  var address = value;
  // console.log($("#buttonGO").val());
  console.log(address, "is the address");
  geocoder.geocode({'address': address}, function(results, status) {
    console.log(results[0].geometry.location);
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        icon: 'http://i.imgur.com/RLwGOHB.png',
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}
