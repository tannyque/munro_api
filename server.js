const express = require('express');
const path = require('path');
const fs = require('fs');

const MUNROS_JSON = path.join(__dirname, 'data/munros.json');

const app = express();
app.use(express.static('public'));
app.set('port', (process.env.PORT || 3003));

app.listen(app.get('port'), () => {
  console.log('Munro Bagger API is running on port', app.get('port'));
});

app.get('/', (req, res) => {
  res.sendfile('public/index.html');
});

// view all
app.get('/munros', (req, res) => {
  fs.readFile(MUNROS_JSON, (err, data) => {
    if (err) process.exit(1);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(JSON.parse(data));
  });
});

// view by name
app.get('/munros/name/:name', (req, res) => {
  fs.readFile(MUNROS_JSON, (err, data) => {
    if (err) process.exit(1);
    const json = JSON.parse(data);
    const arr = json
      .filter(munro => munro.name.toLowerCase() === req.params.name.toLowerCase());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(arr);
  });
});

// view by smcid
app.get('/munros/smcid/:smcid', (req, res) => {
  fs.readFile(MUNROS_JSON, (err, data) => {
    if (err) process.exit(1);
    const json = JSON.parse(data);
    const arr = json
      .filter(munro => munro.smcid.toLowerCase() === req.params.smcid.toLowerCase());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(arr);
  });
});

// view by region
app.get('/munros/region/:region', (req, res) => {
  fs.readFile(MUNROS_JSON, (err, data) => {
    if (err) process.exit(1);
    const json = JSON.parse(data);
    const arr = json
      .filter(munro => munro.region.toLowerCase() === req.params.region.toLowerCase());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(arr);
  });
});
