import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../models/token.js";
import User from "../models/users.js";

export const register = async (request, response) =>{
    try{
        const {name, address, emailId, phoneNo, password} = request.body;
        if(!name || !address || !emailId || !phoneNo || !password){
            return response.status(400).json({error : "Please provide all required fields"});
        }
        const existingUser = await User.findOne({emailId});
        if(existingUser){
            return response.status(400).json({error: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            name,
            address,
            emailId,
            phoneNo,
            password : hashedPassword
        });
        await user.save();
        const token = jwt.sign({userId : user.userId},process.env.JWT_SECRET,{
            expiresIn : '3h'
        });
        await Token.create({token});
        res.json({message : "User registered successfully " ,token});
    }catch(error){
        console.error("Error during registration : ",error.message);
        return response.status(500).json({msg : "Error while registering user"});
    }   
}

export const login = async (request, response) =>{
    try{
        const {userId, password} = request.body;
        if(!userId || !password) {
            return response.status(400).json({error : "Please provide both userid and password"});
        }
        const user = await User.findOne({userId});
        if(!user){
            return response.status(401).json({error : "Invalid userId or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return response.status(401).json({error: "Invalid password"});
        }
        const token = jwt.sign({user: userId},process.env.JWT_SECRET,{
            expiresIn : '3h'
        });
        await Token.create({token});

        response.json({message : "User logged in successfully",token});
    }catch(error){
        return response.status(500).json({error : "Error while loggin user"});
    }
}

export const logout = async (request,response) =>{
    try{
        const authHeader = request.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return response.status(400).json({error : "Token not provided"});
        }
        const token = authHeader.split(" ")[1];
        await token.findOneAndDelete({token});

        return response.status(200).json({message : "User logged out successfully"});
    }catch(error){
        return response.status(500).json({error: "Error while logging out"});
    }
}