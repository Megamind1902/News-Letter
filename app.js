//jshint esversion:6
const express=require ("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
  response.sendFile(__dirname+"/index.html");
})
app.post("/",function(request,response){
  const firstName=request.body.fname;
  const lastName=request.body.lname;
  const email=request.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  url="https://us21.api.mailchimp.com/3.0/lists/fa65144ed2"
  const options={
    method:"POST",
    auth:"lava:e872c67c843c73e95a117933b5a4ee11-us21"
  }
  const req= https.request(url,options,function(res){
    if(res.statusCode === 200){
      response.sendFile(__dirname+"/success.html");
    }
    else{
      response.sendFile(__dirname+"/failure.html");
    }
    res.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  req.write(jsonData);
  req.end();
})
app.post("/failure",function(req,res){
  res.redirect("/");
})
//api key
//e872c67c843c73e95a117933b5a4ee11-us21
//list id
//fa65144ed2
app.listen(8080,function(){
  console.log("Server started on port 8080");
});
