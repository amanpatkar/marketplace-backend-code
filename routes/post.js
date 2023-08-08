const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check.auth")
const extractFile = require("../middleware/file")
const postController = require("../controller/post")

router.get('/:id', postController.getPostNew);
// create posts
router.post("",checkAuth,extractFile
,postController.createPost)
// Get All Posts
router.get('',postController.getPosts)
// Get a specific todo
router.get('/:id',postController.getPost);
// Update a todo
router.put('/:id',checkAuth,
extractFile, postController.updatePost);
// Delete a todo
router.delete('/:id',checkAuth,postController.deletePost);


   
  module.exports = router;