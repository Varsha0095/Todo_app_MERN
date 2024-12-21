import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req, res, next) => {
    // getting token from cookies
    const token = req.cookies?.access_token;
    console.log(token);

    // if token does not exist throw error
    if(!token){
        return next(createError(401, "Not Authenticated!"));
    }
    // if token exists, verify the token 
    jwt.verify(token, process.env.JWT, (err,user)=>{
        if(err) return next(createError(403, "Token is not valid"));  /*if token is exists but is not valid */
        // if token is valid then verify
        req.user = user;
        next();
    })
}