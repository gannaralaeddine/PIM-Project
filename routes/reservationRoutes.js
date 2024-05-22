const {Router} = require("express");
const reservationController = require("../controllers/reservationController");


const router = Router();


router.post("/hardware-booking", reservationController.book);

router.get("/booking-list", reservationController.getBookingList);

router.get("/my-booking-list", reservationController.getMyBookingList);

module.exports = router;
