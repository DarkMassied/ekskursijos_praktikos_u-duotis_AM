var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors())

var CONNECTION_STRING="mongodb+srv://Asdertg45:admin@cluster0.ojjd9hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME="projectasd"
var database

app.listen(5038,()=>{   //port 5038 
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connected");
    })
})

app.get('/main',(request,response)=>{
    database.collection("prjColection").find({}).toArray((error,result)=>{
        response.send(result)
    })
})
