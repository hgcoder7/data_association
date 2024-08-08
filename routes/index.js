var express = require('express');
var router = express.Router();
var userModel= require('./users');
var postModel= require('./posts');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/alluserpost', async function(req, res, next) {
  let user= await userModel.findOne({ _id:"66b4d3cec79167e111eaccac"})
  .populate("posts");
  res.send(user);
})
router.get('/createuser',async function(req, res,next) {
  let createduser=userModel.create({
    username:  "harshh",
    password: "harshit",
    posts: [],
    email: "harshmal@gmail.com",
    fullName: "kuch bhi"
  })
  
  res.send(createduser);
});
router.get('/createpost', async function(req, res, next) {
   let createdpost= await postModel.create({
    postText:"hello ",
    user: "66b4d3cec79167e111eaccac"
  });
 let user= await userModel.findOne({_id: "66b4d3cec79167e111eaccac"});
 user.posts.push(createdpost._id);
 await user.save();
 res.send("done");
})

module.exports = router;
