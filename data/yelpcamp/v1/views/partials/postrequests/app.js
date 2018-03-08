var express = require("express");
var app = express();
var bp = require("body-parser");

var friends = ["Surya" , "Madan" , "Ashok" , "Harikanth"];

app.use(bp.urlencoded({extended: true}));

app.set("view engine","ejs");




app.get("/",function(req,res){
  
  res.render("home");
  
});

app.get("/friends",function(req,res){
  
  
  res.render("friends" , {friends : friends});
  
});

app.post("/addfriend",function(req,res){
  
  console.log(req.body);
  var newfriend = req.body.newfriend;
  friends.push(newfriend);
  res.redirect("/friends");
});




app.listen(3000,function(){
  console.log("App started running");
});