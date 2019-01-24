// module imports
var http = require("http");
var url = require("url");
var fs = require("fs");
var _path = require("path");

// create server
var server = http.createServer(function(req, res) {
  var urlValue = url.parse(req.url, true);
  var parsedPath = urlValue.pathname.replace("/", "");
  console.log(`LOG: Request path is ${parsedPath}`);

  var chosenHandler =
    typeof routes[parsedPath] !== "undefined"
      ? routes[parsedPath]
      : routes["404"];

  req.on("data", function() {});

  req.on("end", function() {
    chosenHandler(urlValue.query, function(httpCode, content) {
      res.setHeader("content-type", "application/json");
      res.writeHead(httpCode);
      var jsonString =
        typeof content !== "undefined" ? JSON.stringify(content, null, 4) : "";
      res.end(jsonString);
      //   console.log(`LOG: Response is ${jsonString}`);
    });
  });
});

// run server
server.listen("3000", function() {
  console.log("Server running in port 3000, http://localhost:3000");
});

// routes
var routes = {
  readFiles: function(data, callback) {
    callback(200, {
      files: files(data)
    });
  },
  "404": function(data, callback) {
    callback(404, {
      response: "404, You just hit an dead end"
    });
  }
};

var files = function(data) {
  if (data.path) {
    try {
      return fs.readdirSync(_path.resolve(`/`, `${data.path}`));
    } catch (error) {
      return ["Given path doesn't exist"];
    }
  }
  return fs.readdirSync("/");
};
