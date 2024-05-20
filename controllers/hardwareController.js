const Hardware = require("../models/Hardware");


module.exports.createNewHardware = async (req, res) => {

    const hardware = await new Hardware({
        title: req.query.title,
        reference: req.query.reference,
        brand: req.query.brand,
        model: req.query.model,
        lab: req.query.lab
    });

    try
    {
        await hardware.save()

        res.status(201).send({ message: "Hardware created successfully" })
    }
    catch (err)
    {
        res.status(400).send(err)
    }

}


module.exports.retreiveHarwareList = async (req, res) => {

    const hardwares = await Hardware.find()

    res.status(200).send(hardwares)

}