//Inporting section init
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.use((req, res, next)=>{
    next()
})

app.get('/accounts' , routes.appAccount.getAccounts)
app.post('/accounts' , routes.appAccount.addAccount)
app.put('/accounts/:id' , routes.appAccount.updateAccount)
app.delete('/accounts/:id' , routes.appAccount.deleteAccount)
app.listen(3000, ()=>{
    console.log('Blog application started')
})