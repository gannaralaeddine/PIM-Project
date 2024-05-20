const db = require("../models");
const User = db.user



module.exports.updateProfile = async (req, res) => {
    const { email, firstName, lastName, espritIdentifier, classroom } = req.query
console.log(email)
    console.log(firstName)
    let user = await User.findOneAndUpdate(
        { email: email },
        {
            $set: {
                email,
                firstName,
                lastName,
                espritIdentifier,
                classroom
            },
        }
    )
    console.log(user)
    return res.status(200).send({ message: "Profile updated successfully" })
}

module.exports.getUser = async (req, res) => {

    let existedUser = await User.findOne({_id: req.query.id}).exec();

    if (existedUser)
    {
        console.log(existedUser)
        res.status(200).send({user: existedUser, message: "User already exists"});
    }
    else
    {
        res.status(404).send({ message: "User not found !"})
    }

}

