const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hardwareSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    userId : {
        type: String
    }
})

const Hardware =  mongoose.model('hardware', hardwareSchema)

module.exports = Hardware
