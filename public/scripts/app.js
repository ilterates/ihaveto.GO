console.log("WE ARE ALIVE");

   var source = $('#toilets-template').html();
   var template = Handlebars.compile(source);

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
    console.log(data);
    var toiletResults = data;
    console.log(toiletResults);
    var toiletHtml = template({toilets:data});
    $(".list-group-item").append(toiletHtml);
  }

  $(".pure-button").click(function(){
     $(".map").toggle( "fade" );
     $(".formField").css("display", "block");
  });







// map
var mymap = L.map('mapid').setView([37.774, -122.431], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ilterates.pk6md0o7',
    accessToken: 'pk.eyJ1IjoiaWx0ZXJhdGVzIiwiYSI6ImNpbXFsYmE1bTAwbDd3a2x1OTNidmtuMDUifQ.p0ZHX4q7HRq_ze-NHyrT4Q'
}).addTo(mymap);
