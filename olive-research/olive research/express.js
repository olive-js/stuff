var express = require('express');
var app = express();
var secondaryServer;

app.get('/', function (req, res) {

  if(!secondaryServer){
    console.log('Configuring other server');
    var secondaryApp = express();
    secondaryApp.get('/', function (req, res) {
      res.send('Secondary server is up')
    })

    secondaryServer = secondaryApp.listen(4000, function () {

      var host = secondaryServer.address().address || 'localhost';
      var port = secondaryServer.address().port || '4000';

      console.log('Secondary server listening at http://%s:%s', host, port);
    })
  }
  res.send('Secondary server started!')
})



var server = app.listen(3000, function () {

  var host = server.address().address || 'localhost';
  var port = server.address().port || '3000'

  console.log('Example app listening at http://%s:%s', host, port)
})
