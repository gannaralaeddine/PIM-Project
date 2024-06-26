const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')



const userSchema = new Schema({

    email:{ type: String, required: [true, 'Please enter an email'],
        unique: true, lowercase: true,
        validate: [ isEmail, 'Please enter a valid email' ]
    },
    firstName:{ type: String, required: false },
    lastName:{ type: String, required: false },
    country:{ type: String, required: true },
    password:{ type: String, required: [false, 'Please enter a password'], minlength: [6, 'Minimum password length is 6 characters'] },
    // reservedItems:[{ type: Schema.Types.ObjectId, ref: 'Hardware' }]
})

// Fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log("new user was created & saved", doc)
    next()
})

// Fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()

    this.password = await bcrypt.hash(this.password, salt)

    next()
})


// Static method to login user
userSchema.statics.login = async function (email, password)
{
    const user = await this.findOne({ email: email })

    console.log("_________________________________________")
    console.log(user)

    if (user)
    {
        const auth = await bcrypt.compare(password, user.password)
        if (auth)
        {
            return user
        }
        throw Error("incorrect password")
    }
    throw Error('incorrect email')
}

/* userSchema.virtual('hikingsCreated',{ 
    ref: 'Hiking', 
    localField: '_id',
    foreignField: 'participants', 
}) */

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

const User =  mongoose.model('user', userSchema)

module.exports = User
