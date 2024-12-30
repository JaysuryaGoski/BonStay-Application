import Hotel from "../models/hotels.js";

export const addReview = async(request, response)=>{
    try{
        const {hotelName, review} = request.body;
        if(!hotelName || !reviews){
            return response.status(400).json({error: "HotelName and Reviews are not found"});
        }
        const hotel = await Hotel.findOne({hotelName});
        if(!hotel){
            return response.status(404).json({error: "Hotel not found"});
        }
        hotel.reviews.push(review);
        await hotel.save();
        response.status(201).json({message : "Review added successfully"});
    }catch(error){
        return response.status(500).json({error: "Error while adding review"});
    }
}

export const getAllReviews = async(request,response)=>{
    try{
        const hotelName = request.params.hotelName;
        const hotel = await Hotel.findOne({hotelName});
        if(!hotel){
            return response.status(404).json({error: "Hotel not found"});
        }
        const reviews = hotel.reviews;
        response.status(201).json(reviews);
        
    }catch(error){
        return response.status(500).json({error: "Error while fetching reviews"});
    }
}