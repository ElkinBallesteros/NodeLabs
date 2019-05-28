const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/edx-course-db'
mongoose.Promise = global.Promise
mongoose.connect(url , { useNewUrlParser: true})
let accountSchema= mongoose.Schema({
    name: String,
    balance: Number
})

let Account = mongoose.model('Account', accountSchema)

module.exports = {

    getAccounts(req, res){
        Account.find((err, accounts) =>{
            if(err){
                res.status(200).send(err)
                return
            }
            else{
                if(accounts.length == 0){
                    res.status(200).send('there are not accounts yet')
                    return
                }
                res.status(200).send(accounts)
            }
        })
    },

    addAccount(req, res){
        if(req.body == undefined){
            res.status(400).send('you must provide the account object')
            return
        }

        let accountNew = new Account (req.body)
        accountNew.save((err, results) =>{
            if(err){
                res.status(500).send(err)
                return
            }
            else{
                accountNew.save()
                res.status(200).send({
                    message : 'Account created successfully',
                    id: results._id
                })
            }
        })                
    },

    updateAccount(req, res){
        var accountUpdate = req.body
        Account.findOne({_id : req.params.id}, (err, result) => {
            if(err){
                res.status(500).send(err)
                return
            }
            else{
                result.balance = accountUpdate.balance
                result.name = accountUpdate.name
                result.save()
                res.status(200).send('account updated')
            }
        })
    },

    deleteAccount(req, res){
        Account.findOne({_id : req.params.id}, (err, result) => {
            if(err){
                res.status(500).send(err)
                return
            }
            else{
                result.remove()
                res.status(200).send('account deleted')
            }
        })
    }
}