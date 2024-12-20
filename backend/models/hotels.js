import mongoose from "mongoose";
const hotelSchema = mongoose.Schema({
    hotelName : {
        type: String ,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amenities: {
        type: String,
        required: true
    },
    address: {
        type: String,
        requierd : true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    reviews: {
        type: [String],
        default : []
    }
});

const Hotel = mongoose.model('hotel',hotelSchema);
export default Hotel;