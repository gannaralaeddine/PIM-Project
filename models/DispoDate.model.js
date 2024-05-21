const mongoose = require("mongoose");

const DispoDate = mongoose.model(
    "dispoDate",
    new mongoose.Schema({
            date: {
                type:String,
                required:true
            },
            // dispoTimes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'DispoTime' } ]
            dispoTimes: [ { type: String } ]
        },
        { timestamps: true })
);
module.exports = DispoDate;
