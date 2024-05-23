const {Router} = require("express");
const reservationController = require("../controllers/reservationController");


const router = Router();

router.get("/retrieve-booking", reservationController.retrieveBooking);

router.post("/hardware-booking", reservationController.book);

router.get("/booking-list", reservationController.getBookingList);

router.get("/my-booking-list", reservationController.getMyBookingList);

router.put("/cancel-booking", reservationController.cancelBooking)

module.exports = router;
