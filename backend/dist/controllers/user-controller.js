import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { generateToken } from "../utils/token-manager.js";
import { setCookie } from "../utils/set-cookie.js";
import jwt from "jsonwebtoken";
import { appCOnfigurations } from "../config/app.config.js";
import { validateJWt } from "../utils/decodeJwt.js";
// GET-REQUEST -->
export const getAllUsers = async (req, res) => {
    // get all Users
    const users = await User.find({}).select("-password");
    res.status(200).json({
        sucess: true,
        data: users,
    });
};
// POST-REQUEST -->
export const signUp = async (req, res) => {
    // get the user information from the request
    const { name, email, password } = req.body;
    // check if the user already exists
    console.log(name, email, password);
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        // hash the password
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            chats: [],
        });
        if (newUser) {
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
            });
        }
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// POST-REQUEST -->
export const signIn = async (req, res) => {
    // get the user information from the request
    const { email, password } = req.body;
    try {
        // check if user exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            // proceed to confirm if the password matches with the one stored.
            const isValid = await compare(password, existingUser.password);
            if (isValid) {
                console.log(isValid, "here now");
                // generate a token
                const accessToken = generateToken("ACCESS", {
                    userId: existingUser._id,
                });
                const refreshToken = generateToken("REFRESH", {
                    userId: existingUser._id,
                });
                setCookie(res, refreshToken);
                return res.status(200).json({
                    name: existingUser.name,
                    email: email,
                    token: {
                        accessToken,
                    },
                });
            }
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        res.status(400).json({
            suceess: false,
            message: "validation error",
        });
    }
    catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
};
export const signOut = (req, res) => {
    // log out should clear the refresh token and also the frontend should clear off the inmemory accesstoken
    try {
        res
            .cookie("refresh_token", "", {
            httpOnly: true,
            secure: true,
            maxAge: 0, // clears the cookie immediately
            sameSite: "none",
        })
            .json({
            success: true,
            message: "user logged out succesfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const refresh = (req, res, next) => {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken)
        return res
            .status(401)
            .json({ success: false, message: "re-authenticate again" });
    // proceed to verify the token
    try {
        const decode = validateJWt(refreshToken);
        console.log(decode);
        if (decode.isExpired) {
            return res.status(403).json({
                success: false,
                message: "re-authenticate again",
            });
        }
        if (!decode.isValid) {
            return res.status(401).json({
                success: false,
                message: "token malformed(invalid)",
            });
        }
        // proceed to generate a new token for the user
        const accessToken = generateToken("ACCESS", {
            userId: decode.decodedInfo.userId,
        });
        res.status(201).json({
            suceess: true,
            token: {
                accessToken: accessToken,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const authStatus = (req, res, next) => {
    // check the cookie if there is any refresh token in it .
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "No Aceess Token, Pls login",
        });
    }
    // check if the token is still valid .
    try {
        const isValid = jwt.verify(refreshToken, appCOnfigurations.JWT_SECRET);
        // get the userId from the sotred refreshToken ,and use it to generate another token
        const accessToken = generateToken("ACCESS", {
            userId: isValid.userId,
        });
        return res.status(200).json({
            success: true,
            token: {
                accessToken: accessToken,
            },
        });
    }
    catch (error) {
        res.status(401).json({
            sucess: false,
            message: error.message,
        });
    }
};
//# sourceMappingURL=user-controller.js.map