
import { Router } from "express";
import {register, login} from "../controllers/userController.js";
import { getHotels,bookRoom ,updateBooking, cancelBooking, getBookings} from "../controllers/bookingsController.js";
import { addReview, getAllReviews } from "../controllers/reviewController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/hotels',getHotels);

router.post('/bookings/:userId/:hotelName',authenticate,bookRoom);
router.put('/bookings/:userId',authenticate,updateBooking);
router.delete('/bookings/:userId/:bookingId',authenticate,cancelBooking);
router.get('/bookings/:userId',authenticate,getBookings);
router.put('/reviews',authenticate,addReview);
router.get('/reviews/:hotelName',authenticate,getAllReviews);
//catching all invalid requests
router.all('*',(request, response )=>{
    response.status(404).json({error : "Invalid request"});
})
export default router;