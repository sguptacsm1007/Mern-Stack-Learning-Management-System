import express from "express";
import bcrypt from "bcrypt"
import cors from "cors";
import db from "./db.mjs"
import "./loadEnvironment.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/books",async(req,res)=>{

    let collection = await db.collection("books");
    let results=await collection.find({'isIssued':false}).toArray();
    
    res.send(results).status(200);

})

app.get("/alreadyissued/:userid",async(req,res)=>{
 // console.log("request hit");
  let collection =await db.collection("books");
  let results=await collection.find({isIssued:true,userId:req.params.userid}).toArray();
  res.send(results).status(200);

})

app.get("/returnbook/:id",async(req,res)=>{
let collection =await db.collection("books");
let results=await collection.updateOne({bookid:parseInt(req.params.id)},{$set:{isIssued:false,userId:""}});
res.send(results).status(200);
})

app.get("/available/:id",async(req,res)=>{
  let collection = await db.collection("books"); 
  let results=await collection.find({isIssued:false,bookid:parseInt(req.params.id)}).toArray(); 
  res.send(results).status(200);

})

//update one needs try catch block on completion of app do the needfull
app.get("/issue/:id/:userid",async(req,res)=>{
 let collection =await db.collection("books");
 //console.log("user requesting is "+req.params.userid);
 let results=await collection.updateOne({bookid:parseInt(req.params.id),isIssued:false},{$set:{isIssued:true,userId:req.params.userid}});
  
 

    
 res.send(results).status(200);
})


app.post("/login/",async(req,res)=>{
  //console.log("post request recieved");
  var body=req.body;
  let collection=await db.collection("users");
  
  let userFound=await collection.find({userid:body.userid.toString()}).toArray();
  if(userFound.length==0){
    res.send([]).status(200);
  }
  else {
  //  console.log("found some records");
  //  console.log(userFound);
    let original_password=userFound[0]["pwd"];
     var userstatus= bcrypt.compareSync(body.pwd, original_password, (err, result) => {
      
      return result;

    });
    
    if(userstatus){
      var UserDetails=[{name:userFound[0].name,userid:userFound[0].userid,role:userFound[0].role}];
     // console.log("User Details",UserDetails);
      res.send(UserDetails).status(200);
    }
    else{
      //console.log("No user or password found");
      res.send([]).status(200);
    }

  }

  
})

app.post("/createnewbook/",async(req,res)=>{
  let collection=await db.collection("books");
  let booknid=await (await collection.distinct("bookid")).length;
  booknid=booknid+1;
  let body=req.body;
  let bookname=body["bookname"];
  let bookdescription=body["description"];
  let bookObj={name:bookname,
    bookid:booknid,
    isIssued:false,
    description:bookdescription,
    userId:""}
//  console.log("book object created");
  let result=await collection.insertOne(bookObj);
  
  res.send(result).status(200);
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
