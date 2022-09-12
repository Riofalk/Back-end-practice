import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser'

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json())
app.use(cookieParser())

app.use('/api', userRoute)
app.use('/api', authRoute)

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

