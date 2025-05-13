import jwt from 'jsonwebtoken';
import User from '../models/User';




const protectRoute = async (req, res, next) => {
    try {
        //get the token, this token is sent in the header of the request
        const token = req.header("Authorization");   //go under the authorization header and get the token
        if (!token) return res.status(401).json({ message: "No token provided, access denied" });

    } catch (error) {
        
    }
}