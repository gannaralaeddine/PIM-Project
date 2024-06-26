const express = require('express');
const router = express.Router();
const userRoutes = require('../models/User');
const userController= require("../controllers/userController");


    router.post('/add',async function(req, res) {
        try {
            console.log(req.body)
            const u = await new userRoutes({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                // birthDate: (new Date(req.body.birthDate).getMonth() + 1) + "-" + new Date(req.body.birthDate).getDate() + "-" + (new Date(req.body.birthDate).getFullYear()),
                country: req.body.country,
                password: req.body.password
            }).save()
            res.status(201)
            res.send(u)
        }
        catch (err)
        {
            res.status(400)
            //res.send("error: userRoutes cannot be added !!!")
            res.send({error: err})
        }

    })


    router.get("/",function(req,res){
        userRoutes.find(function(err, docs){
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(docs)
                res.send(docs)
            }
        })
    })


    router.delete("/delete/:id",function(req,res){
        userRoutes.remove({_id:req.params.id},function(err){
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log("userRoutes deleted successfully")
            }
        })
    })


    router.get("/getUserById/",userController.getUser)


    router.put("/update/profile",userController.updateProfile)




module.exports = router
