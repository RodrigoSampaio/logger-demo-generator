'use strict'

const uuid = require('uuid/v4')

let counter = 0
let key = uuid()

const logType = {
    0: 'INFO',
    1: 'WARN',
    2: 'ERROR',
    3: 'FATAL'
}

const randomLogType = () => {
    const index = Math.floor(Math.random() * (3 - 0) + 0)
    return logType[index]
}

module.exports.getCounter = () => {
    return ++counter
}

module.exports.getKey = () => {
    if (counter % 10 === 0){
        key = uuid()
    }
    return key
}

module.exports.createlog = (text) => {
    return {
        applicationId :	'KAM',
        type : randomLogType(),
        data : text,
        createdAt :	new Date()
    }
}