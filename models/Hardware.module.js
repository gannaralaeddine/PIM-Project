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
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    lab:{
        type: String,
        required: true
    },
    userId : {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    // dispoDates: [ { type: Schema.Types.ObjectId, ref: 'DispoDate' } ]
    dispoDates: [{
        date: {
            type:String
        },
        // dispoTimes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'DispoTime' } ]
        dispoTimes: [ { type: String } ]
    } ]
})

const HardwareModule =  mongoose.model('hardware', hardwareSchema)

module.exports = HardwareModule
