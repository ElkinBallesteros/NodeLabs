module.exports = {
    //Gets the posts lists
    getPosts(req, res) {
        if(req.store.posts == undefined || req.store.posts.length == 0){
            res.status(200).send('there is no posts yet')
            return
        }
        
        res.status(200).send(req.store.posts)
    },
    //Add new post to posts collection
    addPost(req, res) {
        if(req.body == undefined || req.body == null){
            res.status(404).send('you must provide a post object')
            return
        }
        
        let newPost = req.body
        
        if(newPost.comments == undefined)
            newPost.comments=[];
            
        let idPost = req.store.posts.length
        
        req.store.posts.push(newPost)
        res.status(200).send('new post added with id ' + idPost)
    },
    //Update an specific post
    updatePost(req, res) {
        if(req.params.idPost == undefined){
            res.status(404).send('you must provide a post id')
            return
        }

        if(req.body == undefined){
            res.status(404).send('you must provide a post object like')
            return
        }
        
        req.store.posts[req.params.idPost] = req.body
        res.status(200).send('Post added' + req.store.posts[req.params.idPost])
    },
    //Remove an post from posts collection
    removePost(req, res) {
        if(req.params.idPost == undefined){
            res.status(404).send('you must provide a post id')
            return
        }

        if(req.store.posts == undefined || req.store.posts.length == 0){
            res.status(404).send('there is no posts to delete')
            return
        }

        req.store.posts.splice(req.params.idPost, 1)
        res.status(200).send('Post deleted')
    }
}