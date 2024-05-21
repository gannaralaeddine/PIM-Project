const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
            email: {
                type:String,
                required:true,
                unique: true
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
        { timestamps: true })
);
module.exports = User;
