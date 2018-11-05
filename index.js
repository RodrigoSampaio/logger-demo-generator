'use strict'

const request = require('request-promise')
const uuid = require('uuid/v4')

let key = uuid()
let counter = 0

const textRandomizer = () => {

    request('http://www.randomtext.me/api/')
    .then((text) => {
        logGenerator(text)
    })
    .catch((err) => {
        console.log(err)
    })

}

const getKey = () => {
    if (counter % 10 === 0){
        key = uuid()
    }
    return key
}

const createlog = (text) => {
    return {
        applicationId :	'KAM',
        type : 'FATAL',
        data : text,
        createdAt :	new Date()
    }
}

const logGenerator = (text) => {
    
    let options = {
        method: 'POST',
        uri: 'https://mm717i985j.execute-api.us-east-1.amazonaws.com/demo/logs',
        json: true
    }

    options.body = createlog(text)
    options.body.key = getKey()
    
    request(options)
        .then(function (parsedBody) {
            console.log(`log generated: ${JSON.stringify(options.body)}`)
            console.log('\x1b[36m%s\x1b[0m', `---------------------------  ### ${++counter} - ${options.body.key} ### ---------------------------`)
        })
        .catch(function (err) {
            console.log(err.message)
        });
}

 (function (){

    setInterval(() => {
        textRandomizer()
    }, 1500)
    
})()