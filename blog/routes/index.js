const posts = require('./posts.js');
const comments = require('./comments.js');
const express = require('express');
const bodyParser = require('body-parser');

let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
        {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
        {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'      }
      ]
      }
    ]
  }

blog = express();
module.exports.blog = blog;

blog.use(bodyParser.json())

blog.use((req,res,next)=>{
    req.store = store
    next()
})

//Gets the comments lists
blog.get('/comments/:idPost', (req, res)=> {
    comments.getComments(req, res)
})

//Adding new comment
blog.post('/comments/:idPost', (req, res)=> {
    comments.addComment(req, res)
})

//Update an specific comment
blog.put('/comments/:idComment/post/:idPost', (req, res) => {
    comments.updateComment(req, res)
})

//Remove an post from comment collection
blog.delete('/comments/:idComment/post/:idPost',(req, res)=>{
    comments.removeComment(req, res)
})

//Gets the posts lists
blog.get('/posts', (req, res)=> {
    posts.getPosts(req, res)
})

//Add new post to posts collection
blog.post('/posts', (req, res)=> {
    posts.addPost(req, res)
})

//Update an specific post
blog.put('/posts/:idPost', (req, res) => {
    posts.updatePost(req, res)
})

//Remove an post from posts collection
blog.delete('/posts/:idPost',(req, res)=>{
    posts.removePost(req, res)
})