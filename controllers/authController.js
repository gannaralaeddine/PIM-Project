const jwt = require("jsonwebtoken")
const db = require("../models");
const User = db.user
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const nodemailer = require("nodemailer")
const maxAge = 3 * 24 * 60 * 60;


module.exports.register = async (req, res) => {

    const user = await new User({
        email: req.query.email,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        espritIdentifier: req.query.espritIdentifier,
        classroom: req.query.classroom,
        password : bcrypt.hashSync(req.query.password, 8).toString(),
    });

    try
    {
        const existedUser = await User.findOne({ email: user.email }).exec();

        console.log(existedUser)
        if (existedUser)
        {
            res.status(302).send({message: "User already exists"});
        }
        else
        {
            const newUser = await user.save()
            const token = createToken(newUser._id)
            res.cookie('jwt', token, {maxAge: maxAge * 1000})

            res.status(201).send({user: newUser, token: token, message: "User registered successfully"})
        }

    }
    catch (err)
    {
        res.status(400).send(err)
    }

}


module.exports.login = async (req, res) => {

    await User.findOne({email: req.query.email}).then( user => {
        console.log(user);

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(req.query.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send( { message: "Invalid Password!" } );
        }

        let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 }) // 24 hours

        if (!user.isVerified)
        {
            sendConfirmationEmail(user.email, token)
            return res.status(402).send( { message: "Your account isn't verified, a verification email has been sent to your e-mail" } )
        }

        return res.status(200).send({user: user, token: token, message: "User connected successfully"})
        })
        .catch( err => {
            console.log(err.body)
            return res.send(err)

        });
};


module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
}

//Create json web token
const createToken = (id) => {
    return jwt.sign({ id }, 'IchigO banKai ! $ secret', {
        expiresIn: maxAge
    })
}

async function sendConfirmationEmail(email, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gannaralaeddine@gmail.com',
            pass: 'qsgg xlrf nque mkvy'
        },
        tls: { rejectUnauthorized: false }
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            console.log("Server not ready");
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const confirmationLink = config.APP_URL + "confirmation/" + token;

    const mailOptions = {
        from: "gannaralaeddine@gmail.com",
        to: email,
        subject: "Confirm your email",
        html:
            "<h3>Please confirm your email using this </h3><a href='" +
            confirmationLink +
            "'>link</a>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}


exports.confirmation = async (req, res) => {


    console.log("token: " + req.params.token)


    if (req.params.token)
    {
        try
        {
            let token = jwt.verify(req.params.token, config.secret, (err,decoded) => {
                req.userId = decoded.id;
            })
        }
        catch (e)
        {
            return res.send({ message:  "The verification link may have expired, please resend the email." })
        }
    }
    else
    {
        return res.send({ message: "no token" })
    }

    const user = await User.findById(req.userId).exec();

    if (!user)
    {
        return res.status(404).send({ message: "User does not exist, please register !" })
    }
    else if (user.isVerified)
    {
        return res.status(400).send({ message: "This user has already been verified, please login" })
    }
    else
    {
        user.isVerified = true
        let u = await user.save()
        if (!u)
        {
            return res.status(500).send( { message: "error" } )
        }
        else
        {
            return res.status(200).send( { message: "Your account has been verified" } )
        }
    }
}


module.exports.forgotPassword = async (req, res) => {
    const resetCode = req.query.code
    const email = req.query.email

    const user = await User.findOne({ email: email })

    if (user)
    {
        // token creation
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        await sendOTP(email, resetCode)

        res.status(200).send( { message: "L'email de reinitialisation a été envoyé a " + user.email } )
    }
    else
    {
        res.status(404).send( { message: "User not found with this e-mail" } )
    }
}


exports.resetPassword = async (req, res) => {
    const { email, password } = req.query


    if (password)
    {
        const newPasswordEncrypted = await bcrypt.hashSync(password, 8)

        await User.findOneAndUpdate( { email: email }, { password: newPasswordEncrypted } )

        res.status(200).send( { message: "Password updated successfully" } )
    }
    else
    {
        return res.status(403).send( { message: "Password should not be empty" } )
    }
}


async function sendOTP(email, code) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gannaralaeddine@gmail.com",
            pass: "qsgg xlrf nque mkvy",
        },
        tls: {rejectUnauthorized: false}
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            console.log("Server not ready");
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions = {
        from: "gannaralaeddine@gmail.com",
        to: email,
        subject: "Password reset - Booking Hardware App",
        html:
            "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : blue'>" +
            code +
            "</b></p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent : " + info.response);
        }
    });
}
