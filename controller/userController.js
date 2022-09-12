import jwt from 'jsonwebtoken';
import { verifySessionToken } from '../authCheck/authCheck.js';
import userModel from '../models/userModel.js';
import { newCookie } from '../utils/cookieManagment.js';


export const getAllUsers =  async (req, res) => {
    try {
        const allUsers = await userModel.find({}, {password: 0});
        res.status(202).json(allUsers)
    }
    catch (error) {
        res.status(405).send(error.message);
    }

}

export const getUserById =  async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json(user)
    }
    catch (error) {
        res.status(201).send(error.message);
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json(`User named ${user.userName} was deleted`)
    }
    catch (error) {
        console.log(error)
    }
}


export const updateUser = async (req, res) => {
    try {

        const token = req.cookies.session_token;

        jwt.verify(token, process.env.KEY_GEN, (error, decoded) => {
            req.user = decoded;
        })  

        if(!(req.user.isAdmin) & req.body.isAdmin) {
          return res.status(404).send("Cannot change such information: you're not an admin")
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        allUsers.forEach(async (user) => await userModel.findOneAndDelete({ _id: user.id}))
        res.status(200).send("All users deleted successfully")
    }
    catch (error) {
        console.log(error)
    }
}

export const revokeAdmin = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user.isAdmin) return res.status(405).send(`${user.userName} is not an admin`);

        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {isAdmin: false}, {new: true})

        const newToken = newCookie(updateUser);
        const token = req.cookies.session_token;


        jwt.verify(token, process.env.KEY_GEN, (error, decoded) => {
            if(req.params.id == decoded.id)  {
              return res.
              cookie("session_token", newToken, {
              httpOnly: true,
              }).status(201)
              .send(`Your admin rights were revoked`);
            }
        })     

        return res.status(201).send(`${user.userName} admin rights were revoked`);
        
    }

    catch (error) {
        console.log(error)
    }
}

