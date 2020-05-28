const express=require('express');

const app = express();

app.use('/api/posts',(req,res,next)=>{
  const posts=[
    {id:'1',title:'First post',content:'This is first and from server'},
    {id:'2',title:'Second post',content:'This is Second and from server'},
    {id:'3',title:'Third post',content:'This is Third and from server'}
  ];
  res.status(200).json({
    message:"post fetched successfully",
    posts:posts
  });
});
module.exports=app;
