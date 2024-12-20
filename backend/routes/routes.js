
import { Router } from "express";
import {register, login} from "../controllers/userController.js";
import { getHotels,bookRoom ,updateBooking, cancelBooking, getBookings} from "../controllers/bookingsController.js";
import { addReview, getAllReviews } from "../controllers/reviewController.js";
const router = Router();

router.post('/register',register);
router.post('/login',login);
router.post('/bookings/:userId/:hotelName',bookRoom);
router.get('/hotels',getHotels);
router.put('/bookings/:userId',updateBooking);
router.delete('/bookings/:userId/:bookingId',cancelBooking);
router.get('/bookings/:userId',getBookings);
router.put('/reviews',addReview);
router.get('/reviews/:hotelName',getAllReviews);
//catching all invalid requests
router.all('*',(request, response )=>{
    response.status(404).json({error : "Invalid request"});
})
export default router;