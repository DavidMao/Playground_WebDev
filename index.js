var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs")
  port = process.env.PORT || 5000;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname;
  var filename;

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  switch(uri) {
    case '/':
      filename = __dirname + '/src/index.html';
    break;
    default:
      filename = __dirname + uri;
    break;
  }

  fs.exists(filename, function(exists) {
    if(!exists) {
      filename = __dirname + '/src/notFound.html';
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Server running on port: " + port + "\nCTRL + C to shutdown");
