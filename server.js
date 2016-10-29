var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var MUNROS_JSON = path.join(__dirname, "data/munros.json");

app.use(express.static("public"));

app.set("port", (process.env.PORT || 3003));

app.listen(app.get("port"), function() {
  console.log("Munro Bagger API is running on port", app.get("port"));
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

// view by name
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

//view by smcid
app.get('/api/munros/smcid/:smcid', function(req, res){
  fs.readFile(MUNROS_JSON, function(err, data){
    if(err) process.exit(1);
    json = JSON.parse(data);
    smcid_array = [];
    for(munro of json){
      if(munro.smcid.toLowerCase() == req.params.smcid.toLowerCase()){
      smcid_array.push(munro);
      }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(smcid_array);
  });
});

//view by region
app.get('/api/munros/region/:region', function(req, res){
  fs.readFile(MUNROS_JSON, function(err, data){
    if(err) process.exit(1);
    json = JSON.parse(data);
    region_array = [];
    for(munro of json){
      if(munro.region.toLowerCase() == req.params.region.toLowerCase()){
      region_array.push(munro);
      }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(region_array);
  });
});
