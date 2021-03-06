console.log("WE ARE ALIVE");

   var source = $('#toilets-template').html();
   var template = Handlebars.compile(source);
   var value;
   var zoomVal = 12;
   var toiletArray = [];
   var geocoder, map,tempId;

   // GET
$.ajax ({
  method: "GET",
  url: "/api/toilets/",
  dataType: 'json',
  success: renderToilets,
  error: ajaxError
});


function ajaxError(data){
  console.log("ajax handling error" +  data);
}

function renderToilets(data) {
  var toiletResults;
  toiletArray.push(data);
  if (Array.isArray(data)) {
    console.log("it's an array", toiletArray[0]);
    toiletResults = toiletArray[0];
  } else {
    toiletResults = toiletArray;
    console.log("not an array", toiletResults);
  }
  console.log(data, "this is data");
  console.log(toiletArray, "this is toiletArray");
  toiletHtml = template({toilets:toiletResults});
  $(".list-group-item").append(toiletHtml);

// this function was alive when i was not using app.js to change values of buttons for my map
    //   toiletResults.forEach(function(z){
    //   var val = z.StreetNo + " " + z.StreetName + " street " + z.City + " " + z.Zip;
    //   var $button = $("<button>", {value: val, class: 'goButton', text: z.Name, id: 'buttonGO'});
    //   $(".holySpan").append($button);
    //   console.log(z.StreetNo + " " + z.StreetName + " street" + z.City + " " + z.Zip);
    // });
}
function renderNew(data) {
  $.ajax ({
    method: "GET",
    url: "/api/toilets",
    dataType: 'json',
    success: reRender
  });
  function reRender(data){
  //  console.log(data);
    toiletHtml = template({toilets:data});
    //console.log(toiletHtml);
    $(".list-group-item").empty();
    $(".list-group-item").append(toiletHtml);
    $(".formField").css("display", "none");
    $(".formFieldUpdate").css("display", "none");

  }
}

function handleDelete(context) {
    tempId = context;
    var toiletId = $('#delButton').data('toilet-id');
    console.log(toiletId, " toilet id is on left");

      $.ajax({
      method: 'DELETE',
        url: '/api/toilets/' + toiletId,
        success: renderNew,
        error: deleteError
      });
  console.log('removing the following toilet from the page:', toiletId);
}

  $(this).click(function(e){
    if (e.target.name ===  "new") {
      $(".fixedMap").toggle( "fade" );
      $(".formField").css("display", "block");
      $(".formFieldUpdate").css("display", "none");
    }
  });

  $(this).click(function(event){
    if (event.target.name ===  "update") {
      $(".fixedMap").toggle( "fade" );
      $("#formField").css("display", "none");
      $(".formFieldUpdate").css("display", "block");
      tempId = this;
      console.log(tempId);
    }
  });



  $(this).click(function(e){
    if (e.target.name == "delete")
     handleDelete(this);
    });



$("#submitButton").click(function(data){
  data.preventDefault();

  $.ajax ({
    method: "POST",
    url: "/api/toilets",
    data: $("#form").serialize(),
    success: renderNew,
    error: postError

  });
  $(".fixedMap").toggle( "fade" );
});

$("#updateButton").click(function(e){
  e.preventDefault();
$(".fixedMap").toggle( "fade" );
$("#updateForm").css("display", "none");
  var toiletId = $('#delButton').data('toilet-id');
  valueCheat(toiletId);
  function valueCheat(){
    // tempId = $('#delButton').data('toilet-id');
    // var toiletId = $('#delButton').data('toilet-id');
    console.log(toiletId);
    var formData = $("#updateForm").serialize();
    console.log(formData);
  $.ajax({
    method: 'PUT',
    url: '/api/toilets/' + toiletId,
    data:formData,
    success: renderNew,
    error: updateError
  });
}

});
function updateError(data) {
  console.log(data + "error in ajax update");
}
function deleteError(data) {
  console.log(data + "error in ajax delete");
}
function postError (data){
  console.log(data + "Error in ajax post");
}

// Google Maps
  function initMap() {
        map = new google.maps.Map(document.getElementById('mapid'), {
      zoom: zoomVal,
      center: {lat: 37.774, lng: -122.431},
      styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},
      {"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},
      {"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},
      {"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},
      {"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},
      {"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},
      {"featureType":"administrative.province","stylers":[{"visibility":"off"}]},
      {"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},
      {"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},
      {"lightness":-25},{"saturation":-97}]}]
    });
    geocoder = new google.maps.Geocoder();

  }
  $(this).click(function(e) {
    if (e.target.name === "go") {
      value = e.target.value;
      geocodeAddress(geocoder, map);
      console.log(value);
    }
  });



function geocodeAddress(geocoder, resultsMap) {
console.log(value); // strangely code wasn't working until I console logged value here. Before this, address was undefined.. ??
  var address = value;
  // console.log($("#buttonGO").val());
  console.log(address, "is the address"); // why is this returning undefined but it still works?
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
