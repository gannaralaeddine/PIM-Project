const mongoose = require("mongoose");
const db = require("../models");
const User = db.user
const Hardware = require("../models/Hardware.module");

const Booking = mongoose.model(
    "booking",
    new mongoose.Schema({
            user: {
                type: {
                    email: {
                        type:String,
                    },
                    firstName: {
                        type:String,
                        required:true
                    },
                    lastName: {
                        type:String,
                        required:true
                    },
                    espritIdentifier: {
                        type:String,
                        required:true
                    },
                    classroom: {
                        type:String,
                        required:true
                    },
                    password: {
                        type:String,
                        required:true
                    },
                    role: {
                        type: String,
                        required: true,
                        default: "user"
                    },
                    isVerified: {
                        type: Boolean,
                        default: false
                    }
                },
                required:true
            },
            hardware: {
                type: {

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
                            type:String,
                            required:true,
                        },
                        // dispoTimes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'DispoTime' } ]
                        dispoTimes: [ { type: String } ]
                    } ]
                },
                required:true
            },
            date: {
                type: String,
                required:true
            },
            time: {
                type: String,
                required:true
            },
        },
        { timestamps: true })
);
module.exports = Booking;
