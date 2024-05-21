const {Router} = require("express");
const reservationController = require("../controllers/reservationController");


const router = Router();


router.post("/hardware-booking", reservationController.book);


module.exports = router;
