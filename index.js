import express from 'express';
import mongoose from 'mongoose';
import userModel from './userModel.js';

const app = express();
const port = 3000;

app.use(express.json())

const connectionToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://riofalk:Bogomazof0136@cluster0.rpmjx9c.mongodb.net/user?retryWrites=true&w=majority');
    } catch(error) {
        console.log(error);
    };
};


app.post('/create', async (req, res) => {
    try {
        const newUser = await new userModel(req.body);
        await newUser.save();
        res.status(201).send('User is created')
    }
    catch (error) {
        res.status(405).send(error.message);
        console.log(error);
    }

});

app.listen(port, () => {
    connectionToDB();
    console.log(`Server start on port ${port}`)
})

app.get("/abc", (req, res) => {
    res.send("Once again")
})