
const MongoClient = require('mongodb').MongoClient
const datetime = require('node-datetime')
const fs = require('fs')
const async = require('async')

// const customers = require('./Data/m3-customer-data.json')
// const customerAddresses = require('./Data/m3-customer-address-data.json')

console.log('Migration app started')
//Connection URI
const url = 'mongodb://localhost:27017/BlockchainMigrationDB'

let pathCustomers = 'C:\\Elkin\\mongo-migration\\Data\\m3-customer-data.json'
let pathAddress = 'C:\\Elkin\\mongo-migration\\Data\\m3-customer-address-data.json'

let customers = JSON.parse(fs.readFileSync(pathCustomers, 'utf8'))
let customerAddresses = JSON.parse(fs.readFileSync(pathAddress, 'utf8'))
let limit = process.argv[2] || 100
let parallelLimit = process.argv[3] || 10
let startTime = datetime.create(Date.now(), 'd/m/Y H:M:S')

if(customerAddresses > customers)
    itemsProcess = customers.length
else
    itemsProcess = customerAddresses.length

let tasks = []

//Use connect method to connect to the server
MongoClient.connect(url, (error, db) => {
    if (error) return process.exit(1)
    console.log('Connection is okay')
    console.log('Migrations process start')
    // console.log('Process stat at ' + startTime.format())
       
    for (let index = 0; index < customers.length; index++) {
        const element = customers[index];
        //complete the object information
        // if (index == 160)  return
        
        Object.assign(element, customerAddresses[index])
        if((index%limit) == 0){
            tasks.push((callback) => {
                var to = index + limit
                var data = customers.slice(index, to)
                
                db.collection("customers").insertMany(data, function(err, res) {
                    if (error) return process.exit(1)
                    console.log(limit + " customers inserted");
                    callback(error)
                })
            })
        }
        
        async.parallelLimit(tasks, parallelLimit, (error) => {
            if(error) return process.env.exit(1)
                console.log(parallelLimit + "tasks processed")
                db.close()
                if(index == (customers.length - 1)){
                    console.log('Process stat at ' + startTime.format())
                    var now = datetime.create(Date.now(), 'd/m/Y H:M:S')
                    console.log('Process end at ' + now.format())
                }
        })
    }
})