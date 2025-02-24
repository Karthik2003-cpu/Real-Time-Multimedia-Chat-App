import jwt from "jsonwebtoken";
import User from '../models/user.models.js';

export const protectRoute = async (req, res, next) => {//next calls the next function defined after protectRoute   
    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({msg: "Unauthorized - No token provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({msg: "Unauthorized - Invalid token"});

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) return res.status(404).json({msg: "User not found"});

        req.user = user;
        next();
         
    } catch (error) {
        console.log('error in protectRoute', error);
    }
};

export default protectRoute;