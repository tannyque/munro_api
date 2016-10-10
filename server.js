var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var MUNROS_JSON = path.join(__dirname, "data/munros.json");

app.use(express.static("public"));

app.set("port", (process.env.PORT || 3003));

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});

app.get("/", function(req, res){
  res.sendfile("public/index.html");
});

app.get("/api/munros", function(req, res){
  fs.readFile(MUNROS_JSON, function(err, data){
    if(err) process.exit(1);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(JSON.parse(data));
  });
});

app.get('/api/munros/name/:name', function(req, res){
  fs.readFile(MUNROS_JSON, function(err, data){
    if(err) process.exit(1);
    json = JSON.parse(data);
    name_array = [];
    for(munro of json){
      if(munro.name.toLowerCase() == req.params.name.toLowerCase()){
      name_array.push(munro);
      }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(name_array);
  });
});
