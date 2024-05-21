const Hardware = require("../models/Hardware.module");
const DispoDate = require("../models/DispoDate.model");
const Booking = require("../models/Booking.module");
const db = require("../models");
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
        // const dispoDate = await new DispoDate({
        //     date: req.query.date,
        //     dispoTimes: [req.query.time]
        // });

        const booking = await new Booking({
            user: user._id,
            hardware: hardware._id,
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
                await dispoDate.save()

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

