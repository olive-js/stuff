var express = require('express');
var app = express();
var secondaryServer;





app.get('/', function (req, res) {

  if(!secondaryServer){
    /*console.log('Configuring other server');
    var secondaryApp = express();
    secondaryApp.get('/', function (req, res) {
      res.send('Secondary server is up')
    })

    secondaryServer = secondaryApp.listen(4000, function () {

      var host = secondaryServer.address().address || 'localhost';
      var port = secondaryServer.address().port || '4000';

      console.log('Secondary server listening at http://%s:%s', host, port);
    })*/
    console.log('Donwloading npm...');
    var npm = require("npm");
    npm.load(function (er) {
      if (er) return handlError(er);
      npm.commands.install(["hapi"], function (er, hapi) {
        if (er) return commandFailed(er)
        console.log('success npm install...');
        // command succeeded, and data might have some info

        var Hapi = require('hapi');
        secondaryServer = new Hapi.Server();
        secondaryServer.connection({
            host: 'localhost',
            port: 7000
        });

        // Add the route
        secondaryServer.route({
            method: 'GET',
            path:'/',
            handler: function (request, reply) {

                return reply('hello world');
            }
        });

        secondaryServer.start((err) => {

            if (err) {
                throw err;
            }
            console.log('Server running at:', secondaryServer.info.uri);
            res.send('Secondary server started!');
        });



      });
      //npm.on("log", function (message) { .... })
    });


  }

})



var server = app.listen(3000, function () {

  var host = server.address().address || 'localhost';
  var port = server.address().port || '3000'

  console.log('Example app listening at http://%s:%s', host, port)
})
