var express = require('express');
var app = express();
//import {setup} from './env';
var setup = require('./env.js');
//var PORT = 8080;

setup();


const Log=(req)=>{
  msg=req.method+" "+req.path+" - "+req.ip;
  console.log(msg);
};

const path = require('path');

var relativeViewsPath = '/views';
var absoluteViewsPath = __dirname + relativeViewsPath;
var index = absoluteViewsPath + '/index.html';

//console.log(path.join(__dirname, 'public'));

app.use('/public', express.static(path.join(__dirname, 'public/')));

app.get('/', function(req, res){
  Log(req);
    res.sendFile(index);
    //next();
  });

app.get('/json', function(req, res){
  data={"message":"Hello json"};
  if(process.env.MESSAGE_STYLE==="uppercase"){console.log("?");data={"message":"HELLO JSON"};}
  Log(req);
  res.json(data);
  //next();
});

app.get('/now', function(req, res,next){
    req.time=new Date().toString();
    //console.log(req.time);
    next();
  },
    (req,res,next)=>{
    data={"time":req.time};
    res.json(data);
});

































 module.exports = app;
