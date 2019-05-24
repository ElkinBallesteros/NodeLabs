const fs = require('fs')

const downloadF = (pathF)=>{
    console.log('Process Start')
    if(pathF == undefined){
        console.log('You must provede the File path')
        return
    }
    console.log(pathF)
    var dataJson = []
    var contents = fs.readFileSync(pathF, 'utf8')
    contents.split('\n').forEach(function(lineR){
        var data = lineR.split(',')
        var itemJson = {
            id : data[0],
            first_name : data[1],
            last_name: data[2],
            email: data[3],
            gender : data[4],
            ip_address : data[5],
            ssn : data[6],
            credit_card : data[7],
            bitcoin : data[8],
            street_address: data[9]
        }
        dataJson.push(itemJson)

    })
    var newPathF = pathF.replace('.csv', '.json')
    
    fs.writeFileSync(newPathF, JSON.stringify(dataJson, null, 2))

    console.log('the file was converted, the new file is: ' + newPathF)
}
downloadF(process.argv[2])
