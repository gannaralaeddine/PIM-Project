const mongoose = require('mongoose')
const Schema = mongoose.Schema

const labSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    hardwareList:[{ type: Schema.Types.ObjectId, ref:'Hardware' }]
})

const Lab =  mongoose.model('lab', labSchema)

module.exports = Lab
