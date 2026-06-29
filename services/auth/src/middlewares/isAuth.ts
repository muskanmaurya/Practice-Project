import {Request, Response, NextFunction} from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import {IUser} from "../models/user.model.js";
import User from "../models/user.model.js";

export interface AuthenticatedRequest extends Request{
    user?: IUser | null;
}

export const isAuth = async(req:AuthenticatedRequest, res: Response, next:NextFunction):
Promise<void> => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({
                message:"Unauthorized: Please Login",
            })
            return;
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            res.status(401).json({
                message:"Unauthorized: token missing",
            })
            return;        
        }

            const decodedValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            if(!decodedValue || !decodedValue.id){
                res.status(401).json({
                    success:false,
                    message:"Unauthorized: Invalid token",
                })
                return;
            }

            const user = await User.findById(decodedValue.id).select("-password");

            req.user = user;
            next();
        }catch(error: any){
            console.error("JWT verify error:", error);
            const message = error?.message || "Unauthorized: jwt error";
            res.status(401).json({
                success:false,
                message,
            })
        }
}