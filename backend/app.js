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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log("the id is ",req.params.id)
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);

    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
