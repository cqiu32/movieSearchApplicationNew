var express = require("express");
var app = express();
var request = require("request");

//var bodyParser  = require("body-parser");




app.set("view engine", "ejs");

//app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname));


app.get("/", function(req, res){
   var data={};
   
   res.render("index");
});




app.get("/results", function(req, res){
    //console.log("request.BODY is below!!!")
    //console.log(req.body);
    var query = req.query.searchName;
    var url = "http://omdbapi.com/?s=" + query+"&apikey=thewdb";
    request(url, function(error, response, bd){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(bd)
            console.log(data["Search"][0]);
            res.render("results", {data: data,query:query});
        }
    });
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!!");
});





