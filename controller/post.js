const Post = require('../models/post')

exports.createPost = (req,res,next) =>{
    const url = req.protocol + '://' + req.get("host");
      const post = new Post({
          title:req.body.title,
          content:req.body.content,
          imagePath: url + "/images/" +req.file.filename,
          creator: req.userData.userId
      });
      post.save().then(result =>{
        res.status(201).json({
          message:"post send successfully!",
          post: {
            ...result,
            id: result._id
          }
      });
      })
      .catch(err =>{
        res.status(500).json({
          error:{
              message:'Creating a Post Failed!!'
          }
      })
      });
      console.log(post);
     
  }


  exports.getPosts = (req, res, next) => {
    let fetchedPost;
    const pageSize = req.query.pageSize;
    const currentPage = req.query.page;
    const postQuery = Post.find();
    
    if(pageSize && currentPage){
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.then(document =>{
      fetchedPost = document;
      return Post.count();
    })
    .then(count =>{
      res.status(200).json({
        message:'Post fetch  successfully!',
        data: fetchedPost,
        maxPost:count,
        status:200
    })
    }) .catch((error) => {
      res.status(500).json({
        error:{
            message:'fetching the Post is Failed!!'
        }
    });
    });
   
    
  }


  exports.getPost = (req, res) => {
    const { id } = req.params;
  
    Post.findById(id)
      .then((todo) => {
        if (todo) {
          res.json(todo);
        } else {
          res.status(404).json({ error: '{Post} not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error:{
              message:'fetching the Post is Failed!!'
          }
      });
      });
  }

  exports.updatePost = (req, res) => {
    const { id } = req.params;
    let { title, content, imagePath , creator} = req.body;
    if(req.file){
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" +req.file.filename
    }

    Post.updateOne({_id:req.params.id,creator:req.userData.userId}, { title, content, imagePath ,creator})
      .then((todo) => {
        if (todo) {
          if(todo.modifiedCount === 0){
            res.status(401).json({
              error:{
                  message:'Invild User!!!'
              }
          })
          }else{
            res.json({ message: 'Post updated successfully' });
          }
        } else {
          res.status(404).json({ error: 'Post not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error:{
              message:'Updating the Post is Failed!!'
          }
      });
      });
  }


  exports.deletePost = (req, res) => {
    const { id } = req.params;
    Post.deleteOne({_id:req.params.id,creator:req.userData.userId})
      .then((todo) => {
        if (todo) {
          console.log(todo)
          if(todo.deletedCount === 0){
         
            res.status(401).json({
              error:{
                  message:'Invild User!!!'
              }
          })
          }else{
            res.json({ message: 'Post deleted successfully' });
          }
        } else {
          res.status(404).json({ error: 'Post not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error:{
              message:'deleting the Post is Failed!!'
          }
      });
      });
  }

  exports.getPostNew = (req, res, next) => {
    // Handle the GET request for retrieving a specific post by ID
    const postId = req.params.id;

    Post.findById(postId)
      .then((todo) => {
        if (todo) {
          res.json(todo);
        } else {
          res.status(404).json({ error: 'Post not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error retrieving post' });
      });
  
}