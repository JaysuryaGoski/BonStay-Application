import mongoose from "mongoose";

const db = async (request, response) => {
    mongoose.connect('mongodb://localhost:27017/bonStay')
        .then(()=>console.log("Connected to mongoDB database"))
        .catch((error)=>console.error("Error while connecting to mongoDB ",error));
        

}
export default db;