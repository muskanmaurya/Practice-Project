import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/trycatch.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import axios from "axios";
import { oauth2client } from "../config/googleConfig.js";
import dotenv from "dotenv";

dotenv.config();

// export const loginController = TryCatch(async(req, res)=>{
//     const {email, name, picture} = req.body();

//     let user = await User.findOne({email});

//     if(!user){
//         user = await User.create({
//             email,
//             name,
//             image:picture,
//         })
//     }

//     const token = jwt.sign(user, process.env.JWT_SECRET as string, {
//         expiresIn: "7d"
//     });

//     res.status(200).json({
//         success: true,
//         token,
//         user
//     });
// });

// export const loginController = TryCatch(async (req: Request, res: Response) => {

//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all required fields"
//         })
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//         return res.status(400).json({
//             success: false,
//             message: "User not found, please register"
//         })
//     }

//     if (!user.password) {
//         return res.status(400).json({
//             success: false,
//             message: "This account uses Google Login. Please sign in with Google."
//         });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid password"
//         })
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
//         expiresIn: "15d"
//     })

//     res.status(200).json({
//         success: true,
//         message: "User logged in successfully",
//         token,
//         user
//     })

// })

export const loginController = TryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found, please register"
        });
    }

    if (!user.password) {
        return res.status(400).json({
            success: false,
            message: "This account uses Google Login. Please sign in with Google."
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "15d"
    });

    // Sanitize user object output
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: sanitizedUser
    });
});

// export const registerController = TryCatch(async (req, res) => {
//     const { email, name, password } = req.body;

//     if (!email || !name || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all required fields"
//         })
//     }

//     const alreadyUser = await User.findOne({ email });

//     if (alreadyUser) {
//         return res.status(400).json({
//             success: false,
//             message: "User already exists, please login"
//         })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//         email,
//         name,
//         password: hashedPassword,
//         image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//         role: "user"
//     })

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
//         expiresIn: "15d"
//     })

    

//     res.status(201).json({
//         success: true,
//         message: "User registered successfully",
//         token,
//         user
//     })
// })

export const registerController = TryCatch(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    const alreadyUser = await User.findOne({ email });

    if (alreadyUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists, please login"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        name,
        password: hashedPassword,
        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        role: "user"
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "15d"
    });

    // FIX: Sanitize output response to prevent hash leakage
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: sanitizedUser
    });
});

// export const googleLoginController = TryCatch(async (req, res) => {
//     const { code } = req.body;

//     if (!code) {
//         res.status(400).json({
//             success: false,
//             message: "Authorization code is required",
//         })
//     }



//     const googleRes = await oauth2client.getToken(code);

//     oauth2client.setCredentials(googleRes.tokens)

//     const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

//     const { email, name, picture } = userRes.data

//     let user = await User.findOne({ email });

//     if (!user) {
//         user = await User.create({
//             name,
//             email,
//             image: picture,
//         })
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
//         expiresIn: "15d",
//     })

//     res.status(200).json({
//         message: "Login successful",
//         token,
//         user,
//     })
// })

export const googleLoginController = TryCatch(async (req: Request, res: Response) => {
    const { code } = req.body;

    console.log("code: ",code);

    // FIX: Added return to stop execution on missing authorization code
    if (!code) {
        return res.status(400).json({
            success: false,
            message: "Authorization code is required",
        });
    }

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    console.log("googleres: ", googleRes);

    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            name,
            email,
            image: picture,
        });
    }

    console.log("user: ",user)

    const token = jwt.sign(
        { id: user._id },
         process.env.JWT_SECRET as string || "my_temporary_super_secret_backup_string", // 🔥 Added a fallback backup string,
        { expiresIn: "15d" }
    );

    console.log("token: ",token)

    // FIX: Sanitize password output for account linking edge cases
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: sanitizedUser,
    });
});

// const allowedRoles = ["customer", "rider", "seller"] as const;
// type Role = (typeof allowedRoles)[number];

// export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res) => {
//     if (!req.user?._id) {
//         return res.status(401).json({ message: "Unauthorized" })
//     }

//     const { role } = req.body as { role: Role };
//     if (!allowedRoles.includes(role)) {
//         return res.status(400).json({ message: "Invalid role" })
//     }

//     const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true }).select("-password");

//     if (!user) {
//         return res.status(404).json({ message: "User not found" })
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
//         expiresIn: "15d",
//     })


//     res.status(200).json({ user, token, message: "Role added successfully" });
// })


const allowedRoles = ["customer", "rider", "seller"] as const;
type Role = (typeof allowedRoles)[number];

export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?._id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { role } = req.body as { role: Role };
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true }).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });

    return res.status(200).json({ 
        success: true,
        message: "Role added successfully", 
        token,
        user 
    });
});

// export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
//     const user = req.user;
//     res.status(200).json({ user, message: "Profile fetched successfully" });
// })

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    return res.status(200).json({ 
        success: true,
        message: "Profile fetched successfully",
        user: req.user 
    });
});