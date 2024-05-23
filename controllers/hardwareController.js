const Hardware = require("../models/Hardware.module");


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


module.exports.retreiveHardware = async (req, res) => {

    let existedHardware = await Hardware.findOne({_id: req.query.id}).exec();

    if (existedHardware)
    {
        console.log(existedHardware)
        return res.status(200).send( existedHardware );
    }
    else
    {
        return res.status(404).send({ message: "Hardware not found !"})
    }

}


module.exports.updateHardware = async (req, res) => {
    const { title, reference, brand, model, lab } = req.query

    let hardware = await Hardware.findByIdAndUpdate(
        {_id: req.query.id},

        {
            "title": title,
            "reference": reference,
            "brand": brand,
            "model": model,
            "lab": lab
        },

        {
            new: true
        }
    )
    console.log(`hardware title is: ${hardware.title}`)
    return res.status(200).send({ message: "Hardware updated successfully" })
}
