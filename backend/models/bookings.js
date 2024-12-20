import mongoose from "mongoose";
const bookingsSchema = new mongoose.Schema({
    bookingId: {
        type: Number,
        required: true,
        unique: true
    },
    startDate : {
        type: Date,
        required : true,
        validate : {
            validator : (date) => date > new Date(),
            message : "Start date should be greater than today's date"

        }
    },
    endDate :{
        type: Date,
        required: true,
        validate : {
            validator : function(endDate){
                return endDate >= startDate;
            },
            message : "End date should be greater than or equal to start date"
        }
    },
    noOfPersons: {
        type: Number,
        required: true,
        min: [1,"No of persons should be be greater than 0"],
        max : [5, "No of persons should be less than or equal to 5"]
    },
    noOfRooms :{
        type: Number,
        required: true,
        min: [1,"No of Rooms should be be greater than 0"],
        min: [3,"No of Room should be less than or equal to 3"]
    },
    typeOfRoom : {
        type : String,
        required : true
    }
});

const Bookings = mongoose.model('bookings',bookingsSchema);
export default Bookings;