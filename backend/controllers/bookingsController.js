import Hotel from "../models/hotels.js";
import Bookings from "../models/bookings.js";
import User from "../models/users.js";

export const getHotels = async (request, response) =>{
    try{
        const hotels = await Hotel.find();
        return response.status(200).json(hotels);
    }catch(error){
        response.status(500).json({error: "Error fetching hotels"});

    }
}

export const bookRoom = async (request, response) =>{
    try{
        const {userId, hotelName} = request.params;
        const {startDate, endDate, noOfRooms, noOfPersons, typeOfRoom} = request.body;
        if(!startDate || !endDate || !noOfPersons || !noOfRooms || !typeOfRoom){
            return response.status(400).json({error : "please provide all required fields"});
        }
        const user = await User.findOne({userId});
        if(!user){
            return response.status(401).json({error: "Invalid userId "});
        }
        const hotel = await Hotel.findOne({hotelName});
        if(!hotel){
            return response.status.json({error: "Invalid hotelName"});
        }
        const booking = new Bookings({
            userId,
            hotelName,
            startDate,
            endDate,
            noOfPersons,
            noOfRooms,
            typeOfRoom
        });
        await booking.save();
        response.json({message : "Room booked successfully"});

    }catch(error){
        return response.status(500).json({error: "Error while booking Room"});
    }
}

export const updateBooking = async (request,response )=>{
    try{
        const userId = request.params.userId;
        const {startDate,endDate, bookingId} = request.body;
        if(!startDate || !endDate || !bookingId){
            return response.status(400).json({error: "please provide all required fields"});
        }
        const existingBooking = await Bookings.findOne({bookingId, userId});
        if(!existingBooking){
            return response.status(404).json({error: "Booking not found"});
        }
        existingBooking.startDate = startDate;
        existingBooking.endDate = endDate;

        await existingBooking.save();
        response.json({message: "Booking updated successfully"});
    }catch(error){
        return response.status(500).json({error: "Error while updating booking ",error});
    }
}

export const cancelBooking = async (request ,response)=>{
    try{
        const userId = request.params.userId;
        const bookingId = request.params.bookingId;
        const user = await User.findOne({userId});
        if(!user){
            return response.status(404).json({error: "User not found"});
        }
        const booking = await Bookings.findOne({userId, bookingId});
        if(!booking){
            return response.status(404).json({error: "Booking not found"});
        }
        await Bookings.findByIdAndDelete(bookingId._id);
        response.json({message : "Booking cancelled successfully"});

    }catch(error){
        return response.status(500).json({error : "Error while cancelling booking"});
    }
}

export const getBookings = async( request , response)=>{
    try{
        const userId= request.params.userId;
        const user = await User.findOne({ userId });
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }
        const bookings = Bookings.find({userId});
        return response.status(201).json(bookings);
    }catch(error){
        return response.status(500).json({error: "Error while fetching bookings", error});
    }
}