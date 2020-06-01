const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/model");

const app = express();

mongoose.connect("mongodb+srv://sohame:pAr3T6IhNN3s7LMT@cluster0-sgwbe.mongodb.net/node-angular1?retryWrites=true&w=majority")
.then(()=>{
    console.log("Boss Database has been connected, and it's running properly !")
})
.catch(()=>{
    console.log("Connection failed")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


module.exports = app;
