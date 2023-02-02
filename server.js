// console.log("my node be with you")
const express =require("express");
const bodyParser= require('body-parser');

// connecting to mongoose
const mongoose = require("mongoose");

let DB_NAME = process.env.DB_NAME;
let DB_USER = process.env.DB_USER;
let DB_PASS = process.env.DB_PASS;
let DB_URL = process.env.DB_URL
let db_url = "mongodb+srv://" + DB_USER + ":" + DB_PASS + "@starserver1.p7iqqjb.mongodb.net/" + DB_NAME;
console.log(db_url);
let option = {
   maxPoolSize: 10,
   family: 4
};
mongoose.connect(db_url, option);
let db = mongoose.connection
db.once("open", () => {
   console.log("Successful connection to the database");
});

db.on("error", () => {
   console.log("Connection to DB failed");
});
const userSchema = new mongoose.Schema({
    firstName:{type:String,  required:true},
    secondName:{type:String,  required:true},
    emailAddress:{type:String, unique:true, required:true},
    password:{type:String, required: true},
    timmestamp: {type:Date, default: Date.now, immutable:true}

});
let User = mongoose.model('User',userSchema);
let user;


// express
const app =express();
app.listen(3000, function(){
    console.log("listening on 3000")

    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res)=>{
        res.sendFile(__dirname + '/index.html')
    })
    app.post('/quotes', (req, res) => {
        user = {
            firstName:req.body.fName,
            secondName: req.body.sName,
            emailAddress: req.body.email,
            password: req.body.pass,
            
        }
        let newUser = new User(user);
         newUser.save();
         res.redirect('/')
      })
})

