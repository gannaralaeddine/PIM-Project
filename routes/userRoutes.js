const express = require('express');
const router = express.Router();
const userRoutes = require('../models/User');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) 
    {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) 
    {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
    {
        cb(null, true);
    } 
    else 
    {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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


    router.put("/update/:id",function(req,res){

        userRoutes.findByIdAndUpdate(req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthDate: req.body.birthDate,
            country: req.body.country,
            password: req.body.password
        },function(err){
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log("userRoutes updated successfully")
            }

        })
    })




module.exports = router
