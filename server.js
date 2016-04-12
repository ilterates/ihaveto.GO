var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
//app.use('/vendor', express.static(__dirname + '/bower_components'));




/**********
 * ROUTES *
 **********/
 var controllers = require("./controllers");
 var bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true }));


 app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// END POINTS

app.get('/api', controllers.api.index);
app.get('/api/toilets', controllers.toilets.index);
app.get('/api/toilets/:toiletId',controllers.toilets.show);
app.post('/api/toilets', controllers.toilets.create);
app.delete('/api/toilets/:toiletId', controllers.toilets.destroy);
app.put('/api/toilets/:toiletId', controllers.toilets.update);



// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
