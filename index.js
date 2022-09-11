import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json())

app.use('/api', userRouter)

const connectionToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch(error) {
        console.log(error);
    };
};

app.listen(port, () => {
    connectionToDB();
    console.log(`Server start on port ${port}`)
})

