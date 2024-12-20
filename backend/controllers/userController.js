import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import token from "../models/token.js";
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
        res.json({message : "User registered successfully " ,token});
    }catch(error){
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
        response.json({message : "User logged in successfully",token});
    }catch(error){
        return response.status(500).json({error : "Error while loggin user"});
    }
}

export const logout = async (request,response) =>{
    try{
        request.token = null;
        response.status(201).json({message : "User logged out successfully"});

    }catch(error){
        return response.status(500).json({error: "Error while logging out",error});
    }
}