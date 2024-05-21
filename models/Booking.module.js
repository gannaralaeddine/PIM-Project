const mongoose = require("mongoose");

const Booking = mongoose.model(
    "booking",
    new mongoose.Schema({
            user: {
                type: String,
                required:true
            },
            hardware: {
                type: String,
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
