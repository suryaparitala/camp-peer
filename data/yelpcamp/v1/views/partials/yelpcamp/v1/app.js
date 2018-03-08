var express = require("express");
var app = express();
var mongoose = require("mongoose");
app.set("view engine","ejs");
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});

var campgroundSchema = new mongoose.Schema({
  name:String,
  image:String,
  description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//   {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",description:"Awesome place with only granite and nothing else"}, 
//                   function(err ,campground){
//     if(err){
//       console.log("Error");
//     }
//   else{
//     console.log("Newly created camp ground");
//     console.log(campground);
    
//   }
// });



// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];



app.get("/",function(req,res){
  
  res.render("landing");
  
});

app.get("/campgrounds", function(req, res){
  
    Campground.find({},function(err , allcampgrounds){
      
      res.render("index",{campgrounds:allcampgrounds});
    });
    
});




app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    Campground.create(newCampground,function(err , newlyCreated){
      
      if(err){
        console.log("Error in creating");
      }else{
        res.redirect("/campgrounds");
      }
      
    });
    //redirect back to campgrounds page
    
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req, res){
   res.render("show"); 
});





app.listen(3000, function(){
  console.log("App started to run .............");
});