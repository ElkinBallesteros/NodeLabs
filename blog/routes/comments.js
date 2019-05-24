module.exports = {
    //Gets the comments lists
    getComments(req, res) {
        if(req.params.idPost == undefined){
            res.status(404).send('you must provide a post id')
            return
        }
        
        if(req.store.posts[req.params.idPost] == undefined){
            res.status(404).send('the post does not exists')
            return
        }

        res.status(200).send(req.store.posts[req.params.idPost].comments)
    }, 
    //Adding new comment
    addComment(req, res) {
        if(req.params.idPost == undefined){
            res.status(404).send('you must provide a post id')
            return
        }

        if(req.body == undefined){
            res.status(404).send('you must provide a comment object')
            return
        }

        if(req.store.posts[req.params.idPost] == undefined){
            res.status(404).send('the post does not exists')
            return
        }
        let newComment = req.body

        if(req.store.posts[req.params.idPost].comments == undefined){
            req.store.posts[req.params.idPost].comments = []
            return
        }

        let idComment = req.store.posts[req.params.idPost].comments.length
        req.store.posts[req.params.idPost].comments.push(newComment)
        res.status(200).send('new comment added with id ' + idComment)
    },
    //Update an specific comment
    updateComment(req, res) {
        if(req.params.idPost == undefined){
            res.status(404).send('you must provide a post id')
            return
        }

        if(req.params.idComment == undefined){
            res.status(404).send('you must provide a comment id')
            return
        }

        if(req.body == undefined){
            res.status(404).send('you must provide a comment object')
            return
        }

        if(req.store.posts[req.params.idPost] == undefined){
            res.status(404).send('the post does not exists')
            return
        }

        req.store.posts[req.params.idPost].comments[req.params.idComment] = req.body
        res.status(200).send('Post added' + req.store.posts[req.params.idPost])
    },
    //Remove an post from comment collection
    removeComment(req, res) {
        if(req.params.idPost == undefined){
            res.status(404).send('you must provide a post id')
            return
        }

        if(req.params.idComment == undefined){
            res.status(404).send('you must provide a comment id')
            return
        }

        if(req.store.posts[req.params.idPost] == undefined){
            res.status(404).send('the post does not exists')
            return
        }

        if(req.store.posts[req.params.idPost].comments == undefined || req.store.posts[req.params.idPost].comments.length == 0){
            res.status(404).send('there is no comments to delete')
            return
        }

        req.store.posts[req.params.idPost].comments.splice(req.params.idComment, 1)
        res.status(200).send('comment deleted')
    }  
}