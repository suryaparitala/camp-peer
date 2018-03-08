console.log("first express app");
var express = require("express");

var app = express();


app.get("/",function(req,res){
  res.send("Hello there");
});

app.get("/speak/:dog",function(req,res){
  var animal = req.params.dog;
  res.send("Hello Doug" + " "+animal);
});

app.get("/repeat/:word/:times",function(req,res){
 var ans = "";
  for(var i=0;i<req.params.times;i++){
   ans = ans + req.params.word + '\n';
   
 }
  res.send(ans);
});

app.get("*",function(req,res){
  res.send("Empty");
});


app.get("/",function(req,res){
  res.send("Hello there");
});

app.listen(3000,function(){
  console.log("App started running");
});