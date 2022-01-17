const express = require("express");

const Post = require("../models/Post");
const router = express.Router();

//CREATE POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    //save user and return response
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
      res.status(500).json(err) 
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try{
        const post= await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({ $set:req.body});
            res.status(200).json("post updated");
        }else{
            res.status(403).json("can't update")
        }
    }catch (err) {
res.status(500).json(err)
    }

})

//DELETE POST
router.delete("/:id", async (req, res) => {
    try{
        const post= await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post deleted");
        }else{
            res.status(403).json("can't delete")
        }
    }catch (err) {
res.status(500).json(err)
    }

})
//LIKE POST
//like / dislike a post

router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get a post
  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
