'use strict'

const request = require('request-promise')
const utils = require('./utils')

const API_URI = process.env.API_URI

const textRandomizer = () => {
    request('http://www.randomtext.me/api/')
    .then(logGenerator)
    .catch((err) => {
        console.log(err)
    })
}

const logGenerator = (text) => {
    let options = {
        method: 'POST',
        uri: API_URI,
        json: true
    }

    options.body = utils.createlog(text)
    options.body.key = utils.getKey()
    
    request(options)
        .then(() => {
            console.log(`log generated: ${JSON.stringify(options.body)}`)
            console.log('\x1b[36m%s\x1b[0m', `---------------------------  ### ${utils.getCounter()} - ${options.body.key} ### ---------------------------`)
        })
        .catch((err) => {
            console.log(err.message)
        });
}

 (function (){

    setInterval(() => {
        textRandomizer()
    }, 1500)
    
})()