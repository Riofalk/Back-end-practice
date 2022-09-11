import userModel from '../models/userModel.js';
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new userModel({
            ... req.body,
            password: hash,
        })
        
        await newUser.save();
        res.status(201).send('User is created')
    }
    catch (error) {
        res.status(405).send(error.message);
    }
}

export const getAllUsers =  async (req, res) => {
    try {
        const allUsers = await userModel.find({}, {password: 0});
        const { password, ...users} = allUsers;
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

