import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import {newCookie} from "../utils/cookieManagment.js";

dotenv.config();

export const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new userModel({
            ... req.body,
            password: hash,
            isAdmin: false
        })
        
        await newUser.save();
        res.status(201).send('User is created')
    }
    catch (error) {
        res.status(405).send(error.message);
    }
}


export const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne( {email: req.body.email})

        if (!user)  return res.status(404).send("User or password is not correct")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect)  return res.status(404).send("User or password is not correct")

        const token = newCookie(user);

        return res.
            cookie("session_token", token, {
            httpOnly: true,
            })
            .status(201)
            .send(`Successfuly loggen in`)
    }
    catch (error) {
        res.status(405).send(error.message);  
        console.log(error)  
    }
}