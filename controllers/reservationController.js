const Hardware = require("../models/Hardware.module");
const Booking = require("../models/Booking.module");
const DispoDate = require("../models/DispoDate.model");

const db = require("../models");
const mongoose = require("mongoose");
const User = db.user

module.exports.book = async (req, res) => {

    const user = await User.findById(req.query.userId)

    if (!user)
    {
        return res.status(404).send({ message: "User not found" })
    }

    const hardware = await Hardware.findById(req.query.harwareId)

    if (hardware)
    {
        const dispoDate = await new DispoDate({
            date: req.query.date,
            dispoTimes: [req.query.time]
        });

        const booking = await new Booking({
            user: user,
            hardware: hardware,
            date: req.query.date,
            time: req.query.time
        })

        if (hardware.dispoDates && hardware.dispoDates.length > 0)
        {

            try
            {
                for (const item of hardware.dispoDates)
                {
                    if (item.date === req.query.date)
                    {
                        console.log("true")
                        item.dispoTimes.push(req.query.time)
                        break
                    }
                }

                // await dispoDate.save()

                // hardware.dispoDates = [dispoDate]
                // harware.push(dispoDate)

                await hardware.save()

                await booking.save()

                return res.status(201).send({ message: "booking successfully" })
            }
            catch (err)
            {
                console.error("Error saving data:", err);
                return res.status(400).send(err)
            }
        }
        else
        {
            try
            {
                // await dispoDate.save()

                hardware.dispoDates = [dispoDate]

                await hardware.save()

                await booking.save()

                return res.status(201).send({ message: "booking successfully" })
            }
            catch (err)
            {
                console.error("Error saving data:", err);
                return res.status(400).send(err)
            }
        }
    }
    else
    {
        res.status(404).send({ message: "Hardware not found !" })
    }
}

module.exports.getBookingList = async (req, res) => {

    const myBookingsList = await Booking.find()

    return res.status(200).send(myBookingsList)

}

module.exports.getMyBookingList = async (req, res) => {

    console.log("id: " + req.query.userId)

    const bookingsList = await Booking.find()
    const myBookingsList = [];


    for (const item of bookingsList)
    {
        if (item.user._id.toString() ===  req.query.userId)
        {
            console.log("true")
            myBookingsList.push(item)
        }
    }

    return res.status(200).send(myBookingsList)

}

module.exports.retrieveBooking = async (req, res) => {

    const booking = await Booking.findOne({_id: req.query.id}).exec();

    if (!booking)
    {
        return res.status(404).send({ message: "Booking not found" })
    }

    return res.status(200).send( booking )
}

module.exports.cancelBooking = async (req, res) => {
    // find booking by id
    let booking = await Booking.findById({_id: req.query.id})
    let hardware, reservationTimesArray = []

    if (booking)
    {
        // find hardware by id
        hardware = await Hardware.findById({_id: booking.hardware._id})
    }

    hardware.dispoDates.forEach((dateElement) => {
        if (dateElement.date === booking.date)
        {
            dateElement.dispoTimes.forEach((timeElement) => {
                if (timeElement !== booking.time)
                {
                    reservationTimesArray.push(timeElement)
                }
            })

            dateElement.dispoTimes = reservationTimesArray
        }
    })

    await hardware.save()
    await Booking.findByIdAndDelete({ _id: req.query.id })

    return res.status(200).send({ message: "Booking canceled successfully" })
}
