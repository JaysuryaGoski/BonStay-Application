import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        minLength: [3,"Name should have atleast 3 characters"]
    },
    address: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required : true,
        unique : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email ID should fall in this basic pattern"]
    },
    phoneNo: {
        type: Number,
        required: true,
        min : [1000000000, "Phone no should have 10 digits"],
        max : [9999999999, "Phone no should have 10 digits"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should have min length 8"]
    },
    userBookings: {
        type: [String],
        default : []
    }
})

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next({ error: "User already exists with this email id" });
    } else {
      next(error);
    }
});

const User = mongoose.model('users',userSchema);
export default User;