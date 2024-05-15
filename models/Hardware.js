const mongoose = require('mongoose')
const userSchema = require('./User').UserSchema
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
    marque:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    userId : {
        type: String
    },
    participants:[{ type: Schema.Types.ObjectId, ref:'User' }]
})

const Hardware =  mongoose.model('hardware', hardwareSchema)

module.exports = Hardware
