import jwt from "jsonwebtoken";
import Token from "../models/token.js";

export const authenticate  = async(request, response , next) =>{
    const authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return response.status(401).json({error : "Unauthorized access"});
    }
    const token = authHeader.split(" ")[1];

    try {
        const isTokenValid = await Token.findOne({token});
        if(!isTokenValid){
            return response.status(401).json({error: "Invalid or expired token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(500).json({error: "Authentication failed"});
    }
}